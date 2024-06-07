import React from 'react';
import useMovieCastById from '../useMovieCastById';
import styles from './css/CastDetails.module.css';

const CastDetails = ({ movieId }) => {
  const { castDetails } = useMovieCastById(movieId);
  console.log('Cast Details:', castDetails);

  return (
    <div className={styles.castDetailsContainer}>
      
      <h1 className={styles.sub_title}>출연진</h1>

      <div className={styles.castList}>
        {castDetails.map(member => (
          <div key={member.id} className={styles.castMember}>
            {member.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                alt={member.name}
                className={styles.castPhoto}
              />
            )}
            <div className={styles.castInfo}>
              <p className={styles.castName}>{member.name}</p>
              <p className={styles.castRole}>{member.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastDetails;
