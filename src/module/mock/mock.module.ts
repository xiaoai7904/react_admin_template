import SystemConfig from '@/module/systemConfig/SystemConfig'
import mockJson from './mock.json'

export let urlMap = new Map()

export const initUrlMap = (() => {
    for (let i in SystemConfig) {
        urlMap.set((SystemConfig as any)[i], i)
    }
})()

export const mock = function (url: string) {
    return new Promise((resolve, reject) => {
        let urlKey = urlMap.get(url)
        let response = (mockJson as any)[urlKey] || mockJson.success

        if (!urlKey) {
            reject({
                data: {
                    code: 404,
                    msg: `请求地址${url}不存在`,
                }
            })
            return false
        }

        resolve({data: response})
    })
}

export default mock