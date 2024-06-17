import React from 'react';
import styles from '../styles/UpcomingEvents.module.css';
import bellIcon1 from '../public/bellIcon1.png'; 
import bellIcon2 from '../public/bellIcon2.png'; 


const UpcomingEvents = () => {
  const events = [
    {
      icon: 'bellIcon1', 
      title: 'Health appointment',
      description: 'Mr Dok tomm',
      time: '08:20AM - 11:30AM',
      dueSoon: false
    },
  ];
  

  return (
    <div className={styles.upcomingEvents}>
      <h2 className={styles.title}>Upcoming</h2>
      <div className={styles.eventsContainer}>
        {events.map((event, index) => (
          <div key={index} className={styles.event}>
            <div className={styles.iconContainer}>
              <span className={styles.bellIcon}></span>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventDescription}>{event.description}</p>
              <p className={styles.eventTime}>{event.time}</p>
              {event.dueSoon && <span className={styles.dueSoon}>Due Soon</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default UpcomingEvents;
