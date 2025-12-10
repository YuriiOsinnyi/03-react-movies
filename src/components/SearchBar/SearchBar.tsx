import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchAction: (formData: FormData) => Promise<void>;
}

export default function SearchBar({ searchAction }: SearchBarProps) {
  async function handleSearchAction(formData: FormData) {
    const query = (formData.get("query") as string).trim();

    if (query === "") {
      toast.error("Please enter your search query.");
      return;
    }

    try {
      await searchAction(formData);
    } catch {
      toast.error("Search failed. Please try again.");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearchAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
