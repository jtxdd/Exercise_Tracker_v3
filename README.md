# Exercise Tracker REST API
#### A microservice project, part of Free Code Camp's curriculum

### User Stories
| Story | Action | Method |
| ----- | ------ | ------ |
| **C**reate a user. | /new | POST |
| **C**reate a user exercise. | /add | POST |
| **R**ead all users. | /users | GET |
| **R**ead a user. | /log/user?_id= | GET |

---
| Request |
| ------- |
| I can create a user by submitting a form with the new username. |
| I can get an array of all users |
| I can add an exercise to any user by submitting a form with the required inputs (_id, description, duration) & optional input (date, defaults to current date) |
| I can get all logs for a user by submitting the required input (_id) & filter on the optional inputs (from date, to date, limit). |
---
| Response |
| -------- |
| A valid submission returns an object with username and _id. |
| A list of usernames with their associated _id's |
| A valid submission returns an object with the given input |
| A valid submission returns an array of the users logs (object) |