

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrls: string[];
    status: 'Draft' | 'Published';
    createdAt: Date;
    featured?: boolean; // Optional: to highlight specific projects
}
