import React, { useState, useEffect, useCallback } from 'react';
import { Search, Star, Clock, Zap, Heart, Plus, X, ChefHat, Frown } from 'lucide-react';

// --- API Simulation ---
// Simulating a recipe database
let allRecipesData = [
  {
    id: 1,
    title: "Classic Tomato Bruschetta",
    description: "A refreshing and simple Italian appetizer, perfect for any occasion.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-68b3f02a0a7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    time: "15 min",
    difficulty: "Easy",
    tags: ["appetizer", "vegan", "italian"],
    ingredients: [
      "4 large tomatoes, diced",
      "1/2 red onion, finely chopped",
      "1/2 cup fresh basil, chopped",
      "2 cloves garlic, minced",
      "2 tbsp balsamic glaze",
      "3 tbsp olive oil",
      "1 baguette, sliced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a bowl, combine tomatoes, red onion, basil, and garlic.",
      "Stir in olive oil, balsamic glaze, salt, and pepper.",
      "Toast the baguette slices until golden brown.",
      "Top each slice with the tomato mixture and serve immediately."
    ]
  },
  {
    id: 2,
    title: "Creamy Avocado Pasta",
    description: "A quick, healthy, and incredibly creamy pasta dish made without any dairy.",
    imageUrl: "https://images.unsplash.com/photo-1595295333158-e5e3c36098ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    time: "20 min",
    difficulty: "Easy",
    tags: ["pasta", "vegan", "quick"],
    ingredients: [
      "12 oz spaghetti",
      "2 ripe avocados",
      "1/2 cup fresh basil leaves",
      "2 cloves garlic",
      "2 tbsp lemon juice",
      "1/4 cup olive oil",
      "1/2 cup cherry tomatoes, halved",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook spaghetti according to package directions.",
      "While pasta is cooking, add avocados, basil, garlic, and lemon juice to a food processor. Blend until smooth.",
      "With the processor running, slowly drizzle in olive oil.",
      "Drain pasta, reserving 1/2 cup of pasta water.",
      "In a large bowl, toss pasta with avocado sauce. Add pasta water as needed to reach desired creaminess.",
      "Stir in cherry tomatoes, salt, and pepper. Serve warm."
    ]
  },
  {
    id: 3,
    title: "Spicy Chicken Tacos",
    description: "Flavorful, zesty, and easy-to-make chicken tacos that are perfect for a weeknight dinner.",
    imageUrl: "https://images.unsplash.com/photo-1567010675796-02100803c408?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    time: "30 min",
    difficulty: "Medium",
    tags: ["chicken", "mexican", "spicy"],
    ingredients: [
      "1 lb boneless chicken breast, cubed",
      "1 tbsp chili powder",
      "1 tsp cumin",
      "1/2 tsp paprika",
      "1/2 tsp garlic powder",
      "1/4 tsp cayenne pepper (optional)",
      "1 tbsp olive oil",
      "8 small tortillas",
      "Toppings: shredded lettuce, diced tomatoes, cotija cheese, cilantro, lime wedges"
    ],
    instructions: [
      "In a bowl, toss chicken cubes with chili powder, cumin, paprika, garlic powder, and cayenne.",
      "Heat olive oil in a large skillet over medium-high heat.",
      "Add chicken and cook for 5-7 minutes, or until cooked through.",
      "Warm tortillas in a dry skillet or microwave.",
      "Assemble tacos by filling tortillas with chicken and desired toppings."
    ]
  },
  {
    id: 4,
    title: "Hearty Lentil Soup",
    description: "A nutritious and comforting soup packed with vegetables and plant-based protein.",
    imageUrl: "https://images.unsplash.com/photo-1518013431117-eb180c6c0d8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    time: "45 min",
    difficulty: "Easy",
    tags: ["soup", "vegan", "healthy"],
    ingredients: [
      "1 tbsp olive oil",
      "1 large onion, chopped",
      "2 carrots, chopped",
      "2 celery stalks, chopped",
      "4 cloves garlic, minced",
      "1 cup brown or green lentils, rinsed",
      "6 cups vegetable broth",
      "1 tsp dried thyme",
      "1 bay leaf",
      "2 cups spinach",
      "1 tbsp lemon juice",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery. Sauté for 5-7 minutes.",
      "Add garlic and cook for another minute.",
      "Stir in lentils, vegetable broth, thyme, and bay leaf.",
      "Bring to a boil, then reduce heat and simmer for 30-35 minutes, or until lentils are tender.",
      "Remove bay leaf. Stir in spinach and lemon juice. Cook for 1-2 minutes until spinach is wilted.",
      "Season with salt and pepper to taste."
    ]
  },
  {
    id: 5,
    title: "Blueberry Lemon Pancakes",
    description: "Fluffy pancakes bursting with fresh blueberries and a hint of zesty lemon.",
    imageUrl: "https://images.unsplash.com/photo-1554106553-8340c1a81e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    time: "25 min",
    difficulty: "Easy",
    tags: ["breakfast", "vegetarian"],
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "2 tbsp sugar",
      "1 tbsp baking powder",
      "1/2 tsp salt",
      "1 1/4 cups milk",
      "1 large egg",
      "3 tbsp melted butter",
      "1 tsp lemon zest",
      "1 cup fresh blueberries",
      "Maple syrup for serving"
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
      "In a separate bowl, whisk milk, egg, melted butter, and lemon zest.",
      "Pour wet ingredients into dry ingredients and mix until just combined. Do not overmix.",
      "Gently fold in the blueberries.",
      "Heat a lightly oiled griddle over medium heat.",
      "Pour 1/4 cup of batter for each pancake. Cook until bubbles form on the surface, then flip and cook until golden brown.",
      "Serve warm with maple syrup."
    ]
  },
  {
    id: 6,
    title: "One-Pan Salmon & Asparagus",
    description: "A delicious and healthy dinner with minimal cleanup, ready in under 30 minutes.",
    imageUrl: "https://images.unsplash.com/photo-1476907260856-1f5c63efb5a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    time: "25 min",
    difficulty: "Easy",
    tags: ["salmon", "healthy", "quick"],
    ingredients: [
      "2 (6 oz) salmon fillets",
      "1 lb asparagus, trimmed",
      "2 tbsp olive oil",
      "1 tsp garlic powder",
      "1/2 tsp dried oregano",
      "Salt and pepper to taste",
      "1 lemon, sliced"
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "On a large baking sheet, toss asparagus with 1 tbsp olive oil, salt, and pepper.",
      "Pat salmon fillets dry. Rub with remaining 1 tbsp olive oil and season with garlic powder, oregano, salt, and pepper.",
      "Place salmon fillets on the baking sheet next to the asparagus.",
      "Arrange lemon slices on top of the salmon and around the asparagus.",
      "Bake for 12-15 minutes, or until salmon is cooked through and asparagus is tender-crisp."
    ]
  }
];

// Simulating API call
const fetchRecipesFromAPI = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(allRecipesData.slice(0, 6)); // Show some initial recipes
        return;
      }
      const lowerQuery = query.toLowerCase();
      const filtered = allRecipesData.filter(r => 
        r.title.toLowerCase().includes(lowerQuery) ||
        r.tags.some(t => t.toLowerCase().includes(lowerQuery))
      );
      resolve(filtered);
    }, 500);
  });
};

// --- Main App Component ---
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // In a real app, this would be loaded from localStorage or Firestore
    return new Set();
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial recipes
  useEffect(() => {
    setIsLoading(true);
    fetchRecipesFromAPI('')
      .then(data => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Could not load recipes. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  // Handle search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    fetchRecipesFromAPI(searchQuery)
      .then(data => {
        setRecipes(data);
        if (data.length === 0) {
          setError('No recipes found for your query.');
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError('An error occurred while searching.');
        setIsLoading(false);
      });
  }, [searchQuery]);

  // Toggle favorite
  const toggleFavorite = (recipeId) => {
    setFavorites(prevFavs => {
      const newFavs = new Set(prevFavs);
      if (newFavs.has(recipeId)) {
        newFavs.delete(recipeId);
      } else {
        newFavs.add(recipeId);
      }
      return newFavs;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              RecipeFinder
            </h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Favorites</span>
            <span className="bg-white text-indigo-600 text-xs font-bold rounded-full px-2 py-0.5">
              {favorites.size}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-8 md:mb-12 max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for recipes (e.g., 'chicken', 'pasta', 'vegan')"
            className="w-full pl-12 pr-28 py-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-indigo-600 text-white text-base font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>

        {/* Results Grid */}
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {recipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  isFavorite={favorites.has(recipe.id)}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                  onSelectRecipe={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)}
          isFavorite={favorites.has(selectedRecipe.id)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
        />
      )}
    </div>
  );
}

// --- Sub-Components ---

function RecipeCard({ recipe, isFavorite, onToggleFavorite, onSelectRecipe }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-56 object-cover"
          onError={(e) => e.target.src = `https://placehold.co/600x400/e2e8f0/94a3b8?text=${encodeURIComponent(recipe.title)}`}
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onToggleFavorite();
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 hover:text-red-500 transition-colors"
          aria-label="Toggle favorite"
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
              {recipe.tags[0]}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-gray-700">{recipe.rating}</span>
            </div>
          </div>
          <h3 
            className="text-xl font-bold text-gray-900 mb-3 cursor-pointer hover:text-indigo-700"
            onClick={onSelectRecipe}
          >
            {recipe.title}
          </h3>
        </div>
        
        <div className="flex justify-between items-center text-gray-600 border-t pt-4 mt-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
        
        <button
          onClick={onSelectRecipe}
          className="w-full mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

function RecipeModal({ recipe, onClose, isFavorite, onToggleFavorite }) {
  // Effect to lock scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        {/* Modal Header */}
        <div className="relative">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-72 object-cover"
            onError={(e) => e.target.src = `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(recipe.title)}`}
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={onToggleFavorite}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 hover:text-red-500 transition-colors"
            aria-label="Toggle favorite"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h2>
          
          <div className="flex flex-wrap gap-4 mb-6 text-gray-700">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold">{recipe.rating} Rating</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold">{recipe.time}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <Zap className="w-5 h-5 text-green-600" />
              <span className="font-semibold">{recipe.difficulty}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-indigo-200 pb-2">Ingredients</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
            
            {/* Instructions */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-indigo-200 pb-2">Instructions</h4>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-600">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="mt-4 text-lg font-semibold">Loading recipes...</p>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-red-600 bg-red-50 rounded-lg">
      <Frown className="w-16 h-16" />
      <p className="mt-4 text-lg font-semibold">{message}</p>
    </div>
  );
}