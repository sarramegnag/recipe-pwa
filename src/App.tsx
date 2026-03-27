import './App.css'

interface Recipe {
  id: number
  title: string
  description: string
  time: string
  emoji: string
}

const recipes: Recipe[] = [
  { id: 1, title: 'Spaghetti Carbonara', description: 'Classic Italian pasta with eggs, cheese, and pancetta', time: '30 min', emoji: '🍝' },
  { id: 2, title: 'Chicken Tikka Masala', description: 'Creamy spiced tomato curry with tender chicken', time: '45 min', emoji: '🍛' },
  { id: 3, title: 'Caesar Salad', description: 'Crisp romaine with parmesan, croutons, and classic dressing', time: '15 min', emoji: '🥗' },
  { id: 4, title: 'Beef Tacos', description: 'Seasoned ground beef with fresh toppings in corn tortillas', time: '25 min', emoji: '🌮' },
  { id: 5, title: 'Margherita Pizza', description: 'Simple tomato, mozzarella, and basil on thin crust', time: '40 min', emoji: '🍕' },
  { id: 6, title: 'Miso Soup', description: 'Traditional Japanese soup with tofu, wakame, and scallions', time: '10 min', emoji: '🍜' },
  { id: 7, title: 'Banana Pancakes', description: 'Fluffy pancakes with caramelized banana and maple syrup', time: '20 min', emoji: '🥞' },
  { id: 8, title: 'Greek Moussaka', description: 'Layered eggplant and meat bake with béchamel topping', time: '60 min', emoji: '🫕' },
  { id: 9, title: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp, peanuts, and lime', time: '30 min', emoji: '🍤' },
  { id: 10, title: 'French Onion Soup', description: 'Caramelized onion broth topped with crusty bread and melted gruyère', time: '50 min', emoji: '🧅' },
  { id: 11, title: 'Fish and Chips', description: 'Beer-battered cod with crispy fries and tartar sauce', time: '35 min', emoji: '🐟' },
  { id: 12, title: 'Shakshuka', description: 'Poached eggs in spiced tomato and pepper sauce', time: '25 min', emoji: '🍳' },
  { id: 13, title: 'Butter Chicken', description: 'Tender chicken in rich, creamy tomato-butter sauce', time: '40 min', emoji: '🧈' },
  { id: 14, title: 'Pho', description: 'Vietnamese beef noodle soup with herbs and bean sprouts', time: '90 min', emoji: '🍲' },
  { id: 15, title: 'Falafel Wrap', description: 'Crispy chickpea fritters with tahini and fresh vegetables', time: '30 min', emoji: '🧆' },
  { id: 16, title: 'Risotto ai Funghi', description: 'Creamy arborio rice with mixed wild mushrooms and parmesan', time: '35 min', emoji: '🍄' },
  { id: 17, title: 'Bibimbap', description: 'Korean rice bowl with vegetables, beef, and gochujang', time: '40 min', emoji: '🍚' },
  { id: 18, title: 'Tiramisu', description: 'Espresso-soaked ladyfingers layered with mascarpone cream', time: '30 min', emoji: '☕' },
  { id: 19, title: 'Lamb Gyros', description: 'Spiced lamb with tzatziki, tomato, and onion in warm pita', time: '35 min', emoji: '🥙' },
  { id: 20, title: 'Tom Yum Goong', description: 'Hot and sour Thai shrimp soup with lemongrass and galangal', time: '25 min', emoji: '🌶️' },
]

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipes</h1>
      </header>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-card">
            <span className="recipe-emoji">{recipe.emoji}</span>
            <div className="recipe-info">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
            <span className="recipe-time">{recipe.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App