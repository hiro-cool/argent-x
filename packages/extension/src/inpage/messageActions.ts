import { MessageType, WindowMessageType } from "../shared/MessageType"

const extId = document
  .getElementById("argent-x-extension")
  ?.getAttribute("data-extension-id")

export function sendMessage(msg: MessageType): void {
  return window.postMessage(
    { ...msg, extensionId: extId },
    window.location.origin,
  )
}

export function waitForMsgOfType<
  K extends MessageType["type"],
  T extends { type: K } & MessageType,
>(
  type: K,
  timeout: number,
  predicate: (x: T) => boolean = () => true,
): Promise<T extends { data: any } ? T["data"] : undefined> {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(() => reject(new Error("Timeout")), timeout)
    const handler = (event: MessageEvent<WindowMessageType>) => {
      if (event.data.type === type && predicate(event.data as any)) {
        clearTimeout(pid)
        window.removeEventListener("message", handler)
        return resolve(
          ("data" in event.data ? event.data.data : undefined) as any,
        )
      }
    }
    window.addEventListener("message", handler)
  })
}