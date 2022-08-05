import { MiraiError } from '../Error'
import axios from 'axios'
import { GroupID, UserID } from '../Base'

/**
 *  设置群成员信息
 * @param option 选项
 * @param option.httpUrl      mirai-api-http server 的地址
 * @param option.sessionKey   会话标识
 * @param option.target       群成员所在群号
 * @param option.memberId     群成员的 qq 号
 * @param option.info         信息
 */
export default async ({
  httpUrl,
  sessionKey,
  target,
  memberId,
  info
}: {
  httpUrl: string
  sessionKey: string
  target: GroupID
  memberId: UserID
  info: {
    name?: string
    specialTitle?: string
  }
}): Promise<void> => {
  // 请求
  const responseData = await axios.post<{ code: number; msg: string }>(
    new URL('/memberInfo', httpUrl).toString(),
    {
      sessionKey,
      target,
      memberId,
      info
    }
  )
  const {
    data: { msg: message, code }
  } = responseData
  // 抛出 mirai 的异常
  if (code != undefined && code != 0) {
    throw new MiraiError(code, message)
  }
}
