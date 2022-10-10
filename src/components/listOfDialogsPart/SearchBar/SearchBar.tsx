import styles from './SearchBar.module.css';

type Props = {
    input: string
    setInput: (value: string) => void
}

function SearchBar({ input, setInput }: Props) {
    return (
        <div>
            <input
                type="text"
                onChange={e => setInput(e.target.value)}
                value={input}
                placeholder="type here to search..."
                className={styles.input}
            ></input>
        </div>
    );
}

export default SearchBar;
