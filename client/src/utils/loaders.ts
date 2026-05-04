export async function taskLoader() {
    const res = await fetch(`/api/tasks`)
    return res.json()
}

export async function singleTaskLoader(taskId: string) {
    const res = await fetch(`/api/tasks/${taskId}`)
    return res.json()
}