import { Timestamp } from 'firebase/firestore';

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrls: string[];
    status: 'Draft' | 'Published';
    createdAt: Timestamp | any;
    featured?: boolean; // Optional: to highlight specific projects
}
