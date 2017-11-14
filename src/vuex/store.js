import clients from './modules/clients'
import auth from './modules/auth'
import employees from './modules/employees'
import users from './modules/users'
import events from './modules/events'
import manageEvents from './modules/manageEvents'
// import Auth from '../Packages/Auth'
export default {
  modules: {
    clients: clients,
    auth: auth,
    employees: employees,
    users: users,
    events: events,
    manageEvents: manageEvents
  }
}
