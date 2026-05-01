export interface Task {
    _id: string
    title: string
    description?: string
    status: 'pending' | 'in-progress' | 'completed'
    dueDateTime: string
    owner: string
    createdAt?: string
    updatedAt?: string
}
