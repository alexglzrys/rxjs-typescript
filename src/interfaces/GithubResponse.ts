import { GithubUser } from './GithubUser';

export interface GithubResponse {
    total_count:        number;
    incomplete_results: boolean;
    items:              GithubUser[];
}