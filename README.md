# IssueCal

Effortlessly convert GitHub issues into shareable subscription calendars for everyone.

## What's IssueCal

IssueCal is a service that allows you to turn GitHub issues into universally accessible subscription calendars. By converting GitHub issues into ICS format, it enables easy sharing of calendars with anyone, keeping both individuals and groups up-to-date with the latest schedules and events.

## Features
- **Automatic Calendar Event Registration**: Each time you create or update a GitHub issue, IssueCal registers it as an event in your calendar, making it incredibly easy to manage and track events, appointments, or special dates.
- **Shareable Calendar UR**L: Harnessing the power of GitHub Pages, IssueCal allows you to generate shareable calendar URLs. This feature enables friends, family, or anyone else to view and stay up-to-date with your calendar events.
- **Seamless Integration**: IssueCal is designed to work flawlessly with GitHub's issue tracking system, ensuring a smooth and hassle-free experience for both calendar creators and viewers.

## Getting Started

Using IssueCal is simple. Follow the steps below:

1. **Create a repository from the template**: Follow the instructions provided in the ["Create a repository from the template"](#create-a-repository-from-the-template) section of this README to generate a new repository using the IssueCal template.
2. **Setting Up GitHub Pages (Calendar URL)**: Refer to the ["Setting Up GitHub Pages (Calendar URL)"](#setting-up-github-pages-calendar-url) section in this README to activate GitHub Pages and obtain your calendar URL.
3. **Create Event**: Quickly create events by adding a new issue in your GitHub repository using the "Event" issue template. For a detailed guide, refer to the ["Create Event"](#setting-up-github-pages-calendar-url) section in this README.
4. **Subscribing to the Calendar URL**: Once you have your IssueCal calendar URL, you can easily subscribe to it using popular calendar applications such as Google Calendar and Apple Calendar. Check the ["Subscribing to the Calendar URL"](#setting-up-github-pages-calendar-url) section for detailed instructions on how to do this.

### Create a repository from the template
You can click on the following link to generate a repository using the template: [**Create a new repository**](https://github.com/hmu332233/IssueCal/generate) from `hmu332233/IssueCal`.  
Alternatively, you can visit the [IssueCal repository on GitHub](https://github.com/hmu332233/IssueCal) and click on the "Use this template" button on the top-right.

In both cases, the next steps are:

1. Enter a name for your new repository.
2. Click on "Create repository from template".


### Setting Up GitHub Pages (Calendar URL)
To activate GitHub Pages and get your calendar URL, follow these steps:

1. Go to your GitHub repository's main page.
2. Click on the "Settings" tab, located in the top-right corner, just below the repository name.
3. In the Code and automation section of the sidebar, click Pages.
4. Under Build and deployment, under Source, select Deploy from a branch.
5. Under Build and deployment, under Branch, select gh-pages, root.
6. Click "Save" to apply your changes.
7. GitHub will now build and deploy your calendar url. Once the build is complete, you'll see a success message with a link to your published calendar url. The URL format will be `https://<username>.github.io/<repository-name>`.

Make sure to include a link to your published GitHub Pages site in the README, so users can easily access and subscribe to the IssueCal calendar.

```
Example:

Check out our live IssueCal calendar [here](https://<username>.github.io/<repository-name>/events.ics).
```

### Create Event

Follow the steps below to create an event using IssueCal:

1. Navigate to the Issues tab in your GitHub repository.
2. Click on the "New issue" button.
3. Select the "Event" from the available issue templates.
4. Fill out the event details according to the given template.
5. Once you've created the event, IssueCal will automatically convert it into a shareable subscription calendar. This will allow everyone to easily stay informed of the latest schedules and events in your project.


### Subscribing to the Calendar URL
Once you have your IssueCal calendar URL, you can easily subscribe to it using popular calendar applications such as Google Calendar and Apple Calendar. Here's how to do it:

#### Google Calendar
1. Open [Google Calendar](https://calendar.google.com/).
2. On the left side, locate the "Other calendars" section.
3. Click the "+" button next to "Other calendars."
4. Select "From URL" in the dropdown menu.
5. Paste your IssueCal calendar URL in the format **`https://<username>.github.io/<repository-name>/events.ics`** into the "URL of calendar" field.
6. Click "Add calendar."
The IssueCal calendar will now appear in your list of subscribed calendars, and events will automatically update when new events are added.

#### Apple Calendar
1. Open the Calendar app on your Mac.
2. In the menu bar, click "File" > "New Calendar Subscription."
3. Paste your IssueCal calendar URL in the format **`https://<username>.github.io/<repository-name>/events.ics`** into the "Calendar URL" field.
4. Click "Subscribe."
5. Configure your desired settings for the calendar, such as name, color, and refresh frequency.
6. Click "OK."
7. The IssueCal calendar will now appear in your list of subscribed calendars, and events will automatically update when new events are added.

By subscribing to the IssueCal calendar URL, you'll always stay up-to-date with the latest schedules and events in your project.
