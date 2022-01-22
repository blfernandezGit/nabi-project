export const baseUrl = 'https://nabi-project-api.herokuapp.com/api/v1/'

export const loginUrl = 'login'
export const registerUrl = ''
export const userListUrl = 'users'
export const projectListUrl = 'projects'
export const ticketListUrl = 'tickets'
export const commentsListUrl = 'comments'

// Audit Trail
export const loginAuditText = 'Create User Session'
export const registerAuditText = 'Create User Account'
export const userListAuditText = 'Retrieve all users'
export const createTicketAuditText = 'Create New Ticket in Current Project'
export const updateTicketAuditText = 'Update Current Ticket'
export const createCommentAuditText = 'Create New Comment in Current Ticket'

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });