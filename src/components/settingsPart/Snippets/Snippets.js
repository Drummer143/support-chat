import { text } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';

import styles from './Snippets.module.css';

let arr = [
    'Snippet 1',
    'Sentence',
    'BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEG word',
    'Snippet Snippet Snippet Snippet',
    'Snippet Snippet Snippet Snippet Snippet',
    'Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet'
];

const Snippet = ({ text, deleteSnippet, handleSaveEditedSnippet: handleSave }) => {
    const [isDisabled, setDisabled] = useState(true);
    const [input, setInput] = useState(text);

    return (
        <div className={styles.cell}>
            <textarea
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={text ? isDisabled : true}
                className={styles.textarea}
            />
            <div>
                <button
                    onClick={() => handleSave(text, input, setDisabled)}
                    className={`${styles.button} ${styles.greenButton}`}
                >
                    {isDisabled ? 'Edit' : 'Save'}
                </button>
                {!isDisabled || (
                    <button
                        type="button"
                        onClick={() => deleteSnippet(text)}
                        className={`${styles.button} ${styles.redButton}`}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

function Snippets() {
    const [snippets, setSnippets] = useState(arr);
    const [inputDisplaying, setInputDisplaying] = useState('none');
    const [newSnippetText, setNewSnippetText] = useState('');

    const deleteSnippet = text => {
        setSnippets(prev => prev.filter(item => item !== text));
    };

    const handleClick = () => {
        if (inputDisplaying === 'none') {
            setInputDisplaying('initial');
        } else {
            if (newSnippetText && !snippets.includes(newSnippetText)) {
                let s = snippets.slice();
                s.push(newSnippetText);
                setSnippets(s);
            }
            setNewSnippetText('');
            setInputDisplaying('none');
        }
    };

    const handleSaveEditedSnippet = (oldText, newText, setDisabled) => {
        if (newText) {
            let s = snippets.slice();
            s[s.indexOf(oldText)] = newText;
            setSnippets(s);
            setDisabled(prev => !prev);
        } else {
            deleteSnippet(oldText);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h2>Snippets</h2>
            <div>
                <div className={styles.list}>
                    {snippets &&
                        snippets.map((snippet, i) => (
                            <Snippet
                                text={snippet}
                                key={snippet}
                                deleteSnippet={deleteSnippet}
                                handleSaveEditedSnippet={handleSaveEditedSnippet}
                            />
                        ))}
                </div>

                <div className={styles.addNewSnippet}>
                    <textarea
                        type="text"
                        style={{ display: inputDisplaying, resize: 'none' }}
                        value={newSnippetText}
                        onChange={e => setNewSnippetText(e.target.value)}
                        className={styles.textarea}
                    />
                    <div>
                        <button
                            type="button"
                            onClick={handleClick}
                            className={`${styles.button} ${styles.greenButton}`}
                        >
                            {inputDisplaying === 'none' ? 'Add' : 'Save'} snippet
                        </button>
                        <button
                            type="button"
                            style={{ display: inputDisplaying }}
                            onClick={() => setInputDisplaying('none')}
                            className={`${styles.button} ${styles.redButton}`}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Snippets;
