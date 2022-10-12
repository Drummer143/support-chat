import { ReactComponent as Star } from '../../../assets/Star.svg';

import styles from './DialogCell.module.css';

const mapRating = (dialogRating: number | undefined): JSX.Element | JSX.Element[] => {
    let rating: JSX.Element | JSX.Element[];
    if (dialogRating && dialogRating !== -1) {
        let ratingArr: JSX.Element[] = [];
        for (let i = 0; i < 5; i++) {
            const style = dialogRating - 1 <= i ? styles['greyStar'] : styles['goldStar'];
            ratingArr.push(<Star key={style + i} className={style} />);
        }
        rating = ratingArr;
    } else {
        rating = <p className={styles.ratingText}>User did not put a rating</p>;
    }

    return rating;
};

export default mapRating;
