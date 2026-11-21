# GitHub Task Tracker

## User experience
- Add a dedicated `/github/tasks` page reachable from the GitHub stats page and the Roadmap page.
- Show the existing roadmap tasks with category and current status; let Ritik change each task among Done, In progress, and Planned.
- Add an explicit “Update Roadmap” action that applies the selected statuses to the Roadmap view, plus a clear saved/unsaved state.
- Make the tracker usable on mobile and accessible by keyboard.

## Saving and visibility
- Use the persistence choice from the open question: browser-only saved statuses if updates should remain private, or Lovable Cloud with admin-only editing and public Roadmap reads if everyone should see updates.

## Technical details
- Share one task/status source between tracker and Roadmap so status changes cannot drift between pages.
- Add a lazy route, metadata, sitemap entry, and server route registration consistent with existing public pages.
- Add focused tests for task-status validation and persistence behavior; verify tracker-to-Roadmap updates in a browser at desktop and mobile sizes.
- Update the project roadmap to include the task tracker.
