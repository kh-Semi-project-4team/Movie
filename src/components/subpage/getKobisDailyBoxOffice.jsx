class KobisOpenAPIRestService {
  constructor(key, host) {
    this.key = key;
    this.host = host ? host : "http://www.kobis.or.kr";
    this.DAILY_BOXOFFICE_URI = "/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList";
  }

  async requestGet(serviceURI, isJson, paramMap) {
    const url = new URL(this.host + serviceURI + (isJson ? '.json' : '.xml'));
    paramMap.key = this.key;

    Object.keys(paramMap).forEach(key => url.searchParams.append(key, paramMap[key]));

    try {
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        throw new KobisOpenAPIError(await response.text());
      }

      return isJson ? await response.json() : await response.text();
    } catch (error) {
      throw new KobisOpenAPIError(error.message);
    }
  }

  async getDailyBoxOffice(isJson, paramMap) {
    return await this.requestGet(this.DAILY_BOXOFFICE_URI, isJson, paramMap);
  }
}

class KobisOpenAPIError extends Error {
  constructor(message) {
    super(message);
    this.name = 'KobisOpenAPIError';
  }
}

export default KobisOpenAPIRestService;
