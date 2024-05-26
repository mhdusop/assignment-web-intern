# Frontend Project Setup Guide

## Setup

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mhdusop/assignment-web-intern-fe
    ```

2. **Navigate to the project directory:**

    ```bash
    cd assignment-web-intern-fe
    ```

3. **Install dependencies using npm or yarn:**

    ```bash
    npm install
    ```
    or using yarn
    ```bash
    yarn install
    ```

4. **Run the server:**

    ```bash
    npm run dev
    ```

## Vue Router Configuration

In this project, Vue Router is used for routing. Here's a brief description of the routes:

### Routes

- **Home:** 
    - **Path:** `/`
    - **Name:** `home`
    - **Component:** `views/user/index.vue`
    - **Description:** This is the default route for the homepage.

- **User Index:** 
    - **Path:** `/user`
    - **Name:** `user.index`
    - **Component:** `views/user/index.vue`
    - **Description:** Displays a list of users.

- **Create User:** 
    - **Path:** `/user/create`
    - **Name:** `user.create`
    - **Component:** `views/user/create.vue`
    - **Description:** Form for creating a new user.

- **Edit User:** 
    - **Path:** `/user/edit/:id`
    - **Name:** `user.edit`
    - **Component:** `views/user/edit.vue`
    - **Description:** Form for editing an existing user. The `:id` parameter is used to identify the user to be edited.

- **User Detail:** 
    - **Path:** `/user/detail/:id`
    - **Name:** `user.detail`
    - **Component:** `views/user/detail.vue`
    - **Description:** Displays detailed information about a specific user. The `:id` parameter is used to identify the user.

- **Not Found Page:** 
    - **Path:** `/:catchAll(.*)`
    - **Name:** `pages.not-found`
    - **Component:** `pages/notFoundPage.vue`
    - **Description:** Default route for handling 404 errors.

This configuration ensures proper navigation within the frontend application.
