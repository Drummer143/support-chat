import styles from './SnippetPanel.module.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../../types/types';

type Props = {
    addSnippet: (value: string) => void;
};

function SnippetPanel({ addSnippet }: Props) {
    const snippets = useSelector((state: AppState) => state.chatReducer.snippets);

    return (
        <div className={styles.snippets}>
            <h4>Your snippets</h4>
            {snippets.length &&
                snippets.map(snippet => (
                    <button
                        key={snippet}
                        onClick={() => addSnippet(snippet)}
                        className={styles.snippet}
                    >
                        {snippet}
                    </button>
                ))}
        </div>
    );
}

export default SnippetPanel;
