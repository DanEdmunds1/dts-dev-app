import { formToObj } from "./common"

interface LoginActionArgs {
  request: Request
}

interface LoginResponse {
  status: number
  data: any
}

export async function loginAction({ request }: LoginActionArgs): Promise<LoginResponse> {
  try {
    const formData = await formToObj(request)

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    return {
      status: response.status,
      data
    }
  } catch (error) {
    console.error("Error:", error)

    return {
      status: 500,
      data: {
        message: "An error occurred. Please try again."
      }
    }
  }
}
