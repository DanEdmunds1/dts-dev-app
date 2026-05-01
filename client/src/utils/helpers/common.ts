const tokenName = "THIS_IS_A_SECRET_TOKEN_NAME"

// Convert FormData → object
export async function formToObj(request: Request): Promise<Record<string, any>> {
  const formData = await request.formData()
  return Object.fromEntries(formData.entries())
}

// Store JWT token
export function setToken(token: string): void {
  localStorage.setItem(tokenName, token)
}

// Retrieve JWT token
export function getToken(): string | null {
  return localStorage.getItem(tokenName)
}

// Remove JWT token
export function removeToken(): void {
  localStorage.removeItem(tokenName)
}

// Shape of JWT payload (you can expand this later)
interface JWTPayload {
  sub: string
  exp: number
  [key: string]: any
}

// Decode + validate JWT → return user ID or null
export function activeUser(): string | null {
  const token = getToken()
  if (!token) return null

  try {
    const base64 = token.split(".")[1]
    const decoded = atob(base64)
    const payload: JWTPayload = JSON.parse(decoded)

    const now = Date.now() / 1000

    if (payload.exp > now) {
      return payload.sub
    } else {
      removeToken()
      return null
    }
  } catch (err) {
    console.error("Invalid token:", err)
    removeToken()
    return null
  }
}
