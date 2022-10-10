import { useState, useRef } from 'react';

import Snippet from '../Snippet/Snippet';

import styles from './SnippetsList.module.css';

let arr = [
    'Snippet 1',
    'Sentence',
    'word',
    'Snippet Snippet Snippet Snippet',
    'Snippet Snippet Snippet Snippet Snippet',
    'Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet'
];

function SnippetsList() {
    const [snippets, setSnippets] = useState(arr);
    const [inputDisplaying, setInputDisplaying] = useState('none');
    const [newSnippetText, setNewSnippetText] = useState('');
    const newSnippetInputRef = useRef<HTMLTextAreaElement>(null);

    const handleDelete = (text: string) => {
        setSnippets(prev => prev.filter(item => item !== text));
    };

    const handleCreateNewSnippet = () => {
        if (inputDisplaying === 'none') {
            setInputDisplaying('initial');
            setTimeout(() => newSnippetInputRef.current?.focus());
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

    const handleSave = (oldText: string, newText: string, setDisabled: Function) => {
        if (newText) {
            let s = snippets.slice();
            s[s.indexOf(oldText)] = newText;
            setSnippets(s);
            setDisabled((prev: boolean) => !prev);
        } else {
            handleDelete(oldText);
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
                                key={snippet + i}
                                text={snippet}
                                handleDelete={handleDelete}
                                handleSave={handleSave}
                            />
                        ))}
                </div>

                <div className={styles.addNewSnippet}>
                    <textarea
                        style={{ display: inputDisplaying, resize: 'none' }}
                        ref={newSnippetInputRef}
                        value={newSnippetText}
                        onChange={e => setNewSnippetText(e.target.value)}
                        className={styles.textarea}
                    />
                    <div>
                        <button
                            type="button"
                            onClick={handleCreateNewSnippet}
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

export default SnippetsList;
