import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(
                `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}&key=0ed3db69-3657-4b61-91d1-dfad020971ea`
            );
            const data = await res.json();
            if (data.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam("");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }
    }

    function handleAddToFavorite(getCurrentItem) {
        console.log(getCurrentItem);
        setFavoritesList((prevFavoritesList) => {
            const cpyFavoritesList = [...prevFavoritesList];
            const index = cpyFavoritesList.findIndex(
                (item) => item.id === getCurrentItem.id
            );
            if (index === -1) {
                cpyFavoritesList.push(getCurrentItem);
            } else {
                cpyFavoritesList.splice(index, 1);
            }
            return cpyFavoritesList;
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                searchParam,
                loading,
                recipeList,
                setSearchParam,
                handleSubmit,
                recipeDetailsData,
                setRecipeDetailsData,
                handleAddToFavorite,
                favoritesList,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
