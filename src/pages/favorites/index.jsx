import React, { useContext } from "react"; // Ensure React and useContext are imported
import { GlobalContext } from "../../context"; // Adjust the path based on your project structure
import RecipeItem from "../../components/recipe-item"; // Adjust the path based on your project structure

export default function Favorites() {
   const { favoritesList } = useContext(GlobalContext);

   return (
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
         {favoritesList && favoritesList.length > 0 ? (
            favoritesList.map((item) => <RecipeItem key={item.id} item={item} />)
         ) : (
            <div>
               <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
                  Nothing is added in favorites
               </p>
            </div>
         )}
      </div>
   );
}
