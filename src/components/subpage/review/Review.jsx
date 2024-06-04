import React, { useEffect } from 'react';
import styles from './css/review.module.css'

export default function Review() {
    var remark_config = {
        host: 'REMARK_URL',
        site_id: 'YOUR_SITE_ID',
      }

      

    return (
        <div className={styles.container}>
            <h2 className={styles.sub_title}>리뷰</h2>
            <div id="remark42" />
        </div>
    );
}