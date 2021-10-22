export * from './card-left-video';
export * from './card-top-video';
export * from './card-large-video';
export interface ICardProps {
    title: string;
    uploadedDate: string;
    views: string;
    link: string;
}
// export const getViewsDisplay = (views: number) => {
//     if (views < 1000){
//         return views;
//     }else if (views >= 1000){
//         return Math.floor(views/1000)
//     }
// }
