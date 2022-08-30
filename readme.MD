# Module 14// Model-View-Controller (MVC) Challenge: Tech Blog

Using MVC paradigm in the code architectural structure, Handlebars.js as the templating language, Swquelize as the ORM and express-session npm packgae for authentication, a CMS-style blog site similar to a Wordpress site, will be built for developers to publish their blog posts and comment on other developer's post as well.

Link to [Website Blog]:(https://)

# User Story for Tech Blog

AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions

## Criteria

**You will need to run this website in a browser deployed through Heroku.**

**Technologies Used: MVC, ORM, Sequelize, express.js, dotenv package, bcrypt**

CMS-style blog site which:

WHEN the developer **visit the site for the first time**,
THEN the developer is **presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in.**

WHEN the developer **click on the homepage option**,
THEN the user is **taken to the homepage.**

WHEN  the developer **click on any other links in the navigation**,
THEN they are **prompted to either sign up or sign in**.

WHEN the user **choose to sign up**,
THEN they are **prompted to create a username and password**.

WHEN the user **click on the sign-up button**,
THEN the user **credentials are saved and logged into the site**.

WHEN the user  **revisit the site at a later time and choose to sign in**,
THEN the user is **prompted to enter my username and password.**

WHEN the user is **signed in to the site,**
THEN they see **navigation links for the homepage, the dashboard, and the option to log out.**

WHEN the user **click on the homepage option in the navigation,**
THEN the user is **taken to the homepage and presented with existing blog posts that include the post title and the date created.**

WHEN the user **click on an existing blog post,**
THEN they are **presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment.**

WHEN the user **enter a comment and click on the submit button while signed in,**
THEN the **comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created.**

WHEN the user **click on the dashboard option in the navigation,**
THEN the user is  **taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post.**

WHEN the **user click on the button to add a new blog post,**
THEN is **prompted to enter both a title and contents for my blog post**.

WHEN the user **click on the button to create a new blog post,**
THEN the **title and contents of my post are saved and they are taken back to an updated dashboard with my new blog post.**

WHEN the user **click on one of my existing posts in the dashboard,**
THEN is  **able to delete or update my post and taken back to an updated dashboard**.

WHEN the user **click on the logout option in the navigation,**
THEN is **signed out of the site.**

WHEN the **user is idle on the site for more than a set time,**
THEN is **able to view comments but is prompted to log in again before I can add, update, or delete comments.**


### Assets
These are images which demonstrates the application functionality:  

Login/SignUp, Logout, View/Delete/Add/Update Post Content, Add/Update/Delete Comment, Navigate to Dashboard

![Start of the application](./assets/)
![Saved Posts](./assets/)
![Click New Post](./assets/)
![Show/Hide Image](./assets/)

#### Links
[Github Repository](https://github.com/pppreap/challenge14_mvctechblog) 
///
[Blog Website](https://)

#### Credits
User Story and Criteria from Michigan State University Full Stack Development Boot Camp.