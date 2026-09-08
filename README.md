# Church-time Bingo

[Notes](notes.md)

Church-time Bingo is a web game meant to help people who struggle to focus during church garner more out of their experience by giving them a bingo board of open-ended topics for them to look out for and pay attention to during church. With an emphasis in testimony meetings and general conference events, users are allowed to make and join games for the duration of the church reunion with their friends so they can work together to complete bingo boards. 

### Elevator pitch

Have you ever gone to a church service and after a few hours of sitting there listening to lessons realized that you retained none of it? Do you find your mind wandering while people bear their testimonies or find yourself forgetting what people said as soon as they say it? Church-time Bingo makes it so you worship with a purpose, giving you a bingo sheet of gospel topics or scriptures to look out for during church. As you pay attention and put in extra effort to register and recognize what is being shared, you will find your bingo sheet filled out with the gospel lessons that you were meant to learn that week. And after church ends, you can compare your bingo boards with your friends and discuss everyones unique insights to inspire continual gospel learning. 

### Design

![Design image](placeholder.png)

Here is a diagram that shows how people would interact with the backend to see each other's scores.

```mermaid
sequenceDiagram
    actor Bob
    actor Alice
    actor  James
    participant Server
    Bob->>Server: Score Bingo
    Server-->> Alice: Bob Scored a Bingo
    Server-->> James: Bob Scored a Bingo
    Alice->>Server: Topic Complete
    Server -->> Bob: Alice Completed a Topic
    Server-->> James: Alice Completed a Topic
```

### Key features

- Describe your key feature
- Describe your key feature
- Describe your key feature

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Use correct HTML structure and semantics for my application with three pages: One for login, another to customize and start a bingo game, and a third to play bingo. Hyperlinks will navigate between different pages/views.
- **CSS** - Pretty up each page with a consistent art theme with calm colors. Support styling for both mobile and desktop device screen sizes. Be utilized in conjunction with a 3rd party api to make each bingo tile unique (see Service).
- **React** - Provide login and game setup, generate unique bingo cards based off of user preferences, tracking checked-off tiles, display other users' scores. Bingo page reactive to user's actions.
- **Service** - Backend service 
  - Generate unique icons for each bingo tile with [Iconify](https://iconify.design/docs/api/)
  - Register, login, and logout users. Credentials are stored in a database.
  - Submitting and retrieving bingo scores
- **DB/Login** - Store authentication information, users, bingo progress, scores, and friends in the MongoDB database.
- **WebSocket** - As users mark off tiles on their bingo cards, other users in the same game will be alerted of their progress. 

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Git commit requirement)
- [ ] Proper use of Markdown
- [ ] A concise and compelling elevator pitch
- [ ] Description of key features
- [ ] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [ ] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Rented EC2 server** - I did not complete this part of the deliverable.
- [ ] **Leased domain name** - I did not complete this part of the deliverable.
- [ ] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
