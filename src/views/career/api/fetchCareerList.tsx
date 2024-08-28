import { CareerDetail } from '../model/type';
import ky from 'ky';
import { QueryFunctionContext } from '@tanstack/react-query';


const fetchCareerList = async (): Promise<CareerDetail[]> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/all`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }

        // data의 타입을 명확히 정의합니다.
        const data: { jobIdList: CareerDetail[] } = await response.json();

        console.log('job itmes:', data.jobIdList);

        return data.jobIdList;

    } catch (error) {
        console.error('fetchCareerList Error:', error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
    }
};


const getCareerDetail = async (jobId: number): Promise<CareerDetail> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/${jobId}`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data);
        return data as CareerDetail;

    } catch (error) {
        console.error(`getCareerDetail Error for jobId ${jobId}:`, error);
        throw error; 
    }
};


export const fetchCareerListDetail = async (context: QueryFunctionContext<Readonly<[string]>>): Promise<CareerDetail[]> => {
    try {
        const careerItems = await fetchCareerList();
        console.log(careerItems)
        if (!careerItems || careerItems.length === 0) {
            throw new Error('경력 목록이 비어 있습니다.');
        }

        const careerDetailsPromises = careerItems.map((career) => getCareerDetail(career.jobId));
        const careerDetails = await Promise.all(careerDetailsPromises);

        console.log('All Career Details:', careerDetails); 

        return careerDetails;
    } catch (error) {
        console.error('fetchCareerListDetail Error:', error);
        throw error;
    }
};
