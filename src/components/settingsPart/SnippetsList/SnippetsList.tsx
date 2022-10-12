import { ref, update } from '@firebase/database';
import { useState, useRef } from 'react';

import Snippet from '../Snippet/Snippet';
import { database } from '../../../firebase';
import { AppState } from '../../../types/types';
import { useSelector } from 'react-redux';

import { buildPathToSnippets } from '../../../utils';

import styles from './SnippetsList.module.css';

function SnippetsList() {
    const [isNewSnippetInputDisplaying, setIsNewSnippetInputDisplaying] = useState(false);
    const [newSnippetInput, setNewSnippetInput] = useState('');
    const [currentEditingSnippet, setCurrentEditingSnippet] = useState('');
    const newSnippetInputRef = useRef<HTMLInputElement /* HTMLTextAreaElement */>(null);
    const snippets = useSelector((state: AppState) => state.chatReducer.snippets);
    const user = useSelector((state: AppState) => state.authReducer.user);

    const dbRef = ref(database);

    const handleDelete = (text: string) => {
        setIsNewSnippetInputDisplaying(false);
        setCurrentEditingSnippet('');
        const newSnippets = snippets.filter(snippet => snippet !== text);
        update(dbRef, { [buildPathToSnippets(user.uid)]: newSnippets });
    };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>, oldText: string, newText: string) => {
        e.preventDefault();

        if (oldText !== newText) {
            const index = snippets.findIndex(snippet => snippet === oldText);
            const newSnippets = snippets.slice();

            newSnippets[index] = newText;
            update(dbRef, { [buildPathToSnippets(user.uid)]: newSnippets });
        }

        setCurrentEditingSnippet('');
    };

    const handleCancel = () => {
        setIsNewSnippetInputDisplaying(false);
        setNewSnippetInput('');
    };

    const handleCreateNewSnippet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newSnippets = snippets.concat(newSnippetInput);
        update(dbRef, { [buildPathToSnippets(user.uid)]: newSnippets });

        handleCancel();
    };

    return (
        <div
            className={styles.wrapper}
            onKeyDown={e => {
                if (e.key === 'Escape') {
                    handleCancel();
                    setCurrentEditingSnippet('');
                }
            }}
        >
            <h2>Snippets</h2>
            <div>
                {snippets?.length ? (
                    <div className={styles.list}>
                        {snippets.map((snippet, i) => (
                            <Snippet
                                key={snippet + i}
                                text={snippet}
                                currentEditingSnippet={currentEditingSnippet}
                                handleEditButtonClick={(text: string) => {
                                    setCurrentEditingSnippet(text);
                                    setIsNewSnippetInputDisplaying(false);
                                }}
                                handleDelete={handleDelete}
                                handleSave={handleEdit}
                            />
                        ))}
                    </div>
                ) : null}

                {isNewSnippetInputDisplaying ? (
                    <form className={styles.addNewSnippet} onSubmit={handleCreateNewSnippet}>
                        <input
                            autoFocus
                            ref={newSnippetInputRef}
                            value={newSnippetInput}
                            onChange={e => setNewSnippetInput(e.target.value)}
                            className={styles.input}
                        />
                        <div>
                            <button
                                type="submit"
                                className={`${styles.button} ${styles.greenButton}`}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={`${styles.button} ${styles.redButton}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={() => {
                                setIsNewSnippetInputDisplaying(true);
                                setCurrentEditingSnippet('');
                            }}
                            className={`${styles.button} ${styles.greenButton}`}
                        >
                            Add snippet
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default SnippetsList;
