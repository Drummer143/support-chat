import styles from './SnippetPanel.module.css';

type Props = {
    addSnippet: (value: string) => void;
};

function SnippetPanel({ addSnippet }: Props) {
    const snippets = [
        'Snippet 1',
        'Sentence',
        'word',
        'Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet'
    ];

    return (
        <div className={styles.snippets}>
            <h4>Your snippets</h4>
            {snippets.map(snippet => (
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
