import { Link } from "react-router";

function Home() {
    return (
        <main>
            <h1>Welcome to Our Shop</h1>

            <p>
                Welcome to our online store. Browse our collection and find something you love.
            </p>

            <Link to="/shop">Shop Now</Link>
        </main>
    );
}

export default Home;