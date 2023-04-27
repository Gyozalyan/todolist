import React from "react";
import { Col, Container, Row } from 'react-bootstrap'
import styles from './Nav.module.css';



const About = ()=>{

    return (
        <Container>

<Row>
    <Col>
 

  <section className={styles.todoSection}>
    <h2 className={styles.sectionTitle}>Manage Your Tasks Efficiently</h2>
    <p className={styles.sectionIntro}>Welcome to our to-do list website! Our platform is designed to help you manage your tasks efficiently and stay organized. Whether you're a busy professional, a student, or just someone who wants to keep track of their daily tasks, our website has you covered. With our intuitive and user-friendly interface, you can easily create, organize, and prioritize your tasks to stay on top of your to-do list.</p>
    <div className={styles.featuresContainer}>
      <div className={styles.feature}>
        <h3 className={styles.featureTitle}>Create and Customize Tasks</h3>
        <p className={styles.featureDescription}>Our website allows you to create tasks quickly and easily. You can add task titles, descriptions, due dates, and tags to help you categorize and prioritize your tasks. You can also customize the priority levels of your tasks, set reminders, and add attachments or notes to provide additional details or instructions.</p>
      </div>
      <div className={styles.feature}>
        <h3 className={styles.featureTitle}>Organize and Categorize Tasks</h3>
        <p className={styles.featureDescription}>You can organize your tasks into different categories or lists to help you keep track of different types of tasks or projects. You can create personalized categories, such as "Work," "Personal," "Errands," or "School," and easily move tasks between categories as needed. This way, you can have a clear overview of all your tasks and easily switch between different categories.</p>
      </div>
      <div className={styles.feature}>
        <h3 className={styles.featureTitle}>Prioritize and Sort Tasks</h3>
        <p className={styles.featureDescription}>Our website allows you to set priority levels for your tasks, such as high, medium, or low, to help you determine which tasks are most important or urgent. You can also sort your tasks based on different criteria, such as due date, priority, or alphabetically, to easily identify which tasks require immediate attention and which ones can be addressed later.</p>
      </div>
      <div className={styles.feature}>
        <h3 className={styles.featureTitle}>Mark and Complete Tasks</h3>
        <p className={styles.featureDescription}>Once you've completed a task, you can mark it as "complete" in our website. This will help you keep track of your progress and visually see which tasks are done. You can also view completed tasks separately, archive them, or delete them if you no longer need them, helping you maintain a clean and organized task list.</p>
      </div>
      <div className={styles.feature}>
        <h3 className={styles.featureTitle}>Collaborate and Share Tasks</h3>
        <p className={styles.featureDescription}>Our website allows you to collaborate and share tasks with others. You can assign tasks to team members, set due dates and reminders for shared tasks, and communicate with your team through comments or notifications. This makes it easy to work together on group projects, assignments, or team tasks, and ensures everyone is on the same page.</p>
      </div>
    </div>
    <p className={styles.sectionConclusion}>With our to-do list website, managing your tasks efficiently has never been easier. Stay organized, prioritize your tasks, and track your progress with our intuitive and user -friendly platform. Sign up now and start getting things done!</p>
    </section>
    </Col>
</Row>

        </Container>)
        
}

export default About