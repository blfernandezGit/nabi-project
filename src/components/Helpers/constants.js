export const baseUrl = 'https://nabi-project-api.herokuapp.com/api/v1/'
// export const baseUrl = 'http://localhost:3000/api/v1/'

export const loginUrl = 'login'
export const registerUrl = ''
export const userListUrl = 'users'
export const projectListUrl = 'projects'
export const ticketListUrl = 'tickets'
export const commentsListUrl = 'comments'
export const updateUserProjectsUrl = 'update_user_projects'
export const updateProjectUsersUrl = 'update_project_users'
export const currentUserProjectsUrl = 'current_user_projects'
export const addRelatedTicketUrl = 'add_related_ticket'
export const deleteRelatedTicketUrl = 'delete_related_ticket'
export const photosUrl = 'photos'

// Audit Trail
export const loginAuditText = 'Create User Session'
export const registerAuditText = 'Create User Account'
export const userListAuditText = 'Retrieve all users'
export const createTicketAuditText = 'Create New Ticket in Current Project'
export const updateTicketAuditText = 'Update Current Ticket'
export const createCommentAuditText = 'Create New Comment in Current Ticket'
export const createProjectAuditText = 'Create New Project'
export const updateProjectAuditText = 'Update Current Project'
export const deleteProjectAuditText = 'Delete Current Project'
export const createUserAuditText = 'Create New User'
export const updateUserAuditText = 'Update User'
export const deleteUserAuditText = 'Delete User'

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });

export const detailedDateFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true
});