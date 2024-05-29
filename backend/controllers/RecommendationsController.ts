import natural from 'natural';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import Job from '../models/Job';
import tfidfVectorizerParams from '../algorithm/tfidf_vectorizer.json';
import tfidfMatrixJson from '../algorithm/tfidf_matrix.json';
import cosineSim from '../algorithm/cosine_similarity_matrix.json';



const handleJobsRecommendations = async (req: Request, res: Response) => {
    try {
        const {sector} = req.params;

        // Check if userInput exists
        if (!sector) {
            return res.status(400).json({ error: 'User input is required' });
        }

        const jobPostings = await Job.find({});

         // Expand user input with synonyms or related terms
         const expandedUserInput = expandUserInput(sector);

         // Filter job postings based on relevance to user input
         const relevantJobPostings = jobPostings.filter(job => {
             // Check if the job title contains any keyword from the expanded user input
             const jobTitleKeywords = job.title.toLowerCase().split(' ');
             return expandedUserInput.some((keyword : any) => jobTitleKeywords.includes(keyword));
         });

        // Get the absolute paths of the files using 'path.join'
        // const tfidfVectorizerPath = path.join('backend\\files\\tfidf_vectorizer.json');
        // const tfidfMatrixPath = path.join('backend\\files\\tfidf_matrix.json');
        // const cosineSimPath = path.join('backend\\files\\cosine_similarity_matrix.json');

        // const tfidfVectorizerPath = path.join(__dirname, 'algorithm', 'tfidf_vectorizer.json');
        // const tfidfMatrixPath = path.join('C:\\Users\\USER\\Desktop\\AI-PoweredJobSearch\\backend\\files\\tfidf_matrix.json');
        // const cosineSimPath = path.join('C:\\Users\\USER\\Desktop\\AI-PoweredJobSearch\\backend\\files\\cosine_similarity_matrix.json');

        // console.log(tfidfVectorizerPath);


        // Load data in Node.js
        // const tfidfVectorizerParams = JSON.parse(fs.readFileSync(tfidfVectorizerPath, 'utf-8'));
        // const tfidfMatrix = JSON.parse(fs.readFileSync(tfidfMatrixPath, 'utf-8'));
        // const cosineSim = JSON.parse(fs.readFileSync(cosineSimPath, 'utf-8'));

        const tfidfMatrix : any = tfidfMatrixJson;

        
        // Preprocess job postings from the database to create a corpus
        const jobTitles = relevantJobPostings.map(job => job.title);
        const jobCorpus = jobTitles.join(' ');

        // Tokenize and stem job corpus using natural
        const tokenizer = new natural.WordTokenizer();
        const stemmedJobCorpus = tokenizer.tokenize(jobCorpus);
        if (!stemmedJobCorpus || stemmedJobCorpus.length === 0) {
            // Handle the case where stemmedJobCorpus is null or empty
            console.error('Stemmed job corpus is null or empty');
            return res.status(400).json({ error: 'No job recommendations' });
        }
        const jobCorpusStemmed = stemmedJobCorpus?.join(' ');

        // Tokenize and stem user input
        const userTokenizer = new natural.WordTokenizer();
        const userTokens = userTokenizer.tokenize(sector);
        // Check if userInput exists
        if (!userTokens) {
            return res.status(400).json({ error: 'User tokens equired' });
        }
        const userTokensStemmed = userTokens.map(token => natural.PorterStemmer.stem(token));
        const userInputStemmed = userTokensStemmed.join(' ');

        // Calculate TF-IDF vector for user input
        const userTfidf = calculateTfidfVector(userInputStemmed, tfidfVectorizerParams);

        // Calculate cosine similarity between user input and each job posting
        const similarities = jobTitles.map((title, index) => {
            const jobTfidf  = tfidfMatrix[index];
            const similarity = calculateCosineSimilarity(userTfidf, jobTfidf);
            return { index, similarity };
        });

        // Sort job postings by similarity scores
        similarities.sort((a, b) => b.similarity - a.similarity);

        // Get top 5 job recommendations
        const recommendedJobs = similarities.slice(0, 3).map(sim => relevantJobPostings[sim.index]);

        return res.status(200).json( recommendedJobs );
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Function to expand user input with synonyms or related terms
const expandUserInput = (input: string) => {
    // Your implementation to expand the input using synonyms or related terms
    // You can use external APIs, databases, or libraries for synonym lookup
    // For demonstration purposes, let's say you have a simple mapping of terms
    const synonymMapping: { [key: string]: string[] } = {
        "development": ["developer", "software", "engineering"],
        // Add more mappings as needed
    };

    const expandedTerms = input.split(' ').flatMap(term => {
        if (synonymMapping.hasOwnProperty(term)) {
            return [term, ...synonymMapping[term]];
        }
        return [term]; // Return term as an array if no synonyms found
    });

    return expandedTerms;
};




// Calculate TF-IDF vector for given input
const calculateTfidfVector = (input: string, tfidfVectorizerParams: any) => {
    const { vocabulary, idf } = tfidfVectorizerParams;

    // Tokenize input
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(input);

    // Check if userInput exists
   

    // Stem tokens using Porter Stemmer
    const stemmer = natural.PorterStemmer;

    let stemmedTokens: string[] = [];
    if(tokens){
        stemmedTokens = tokens.map(token => stemmer.stem(token.toLowerCase()));
    }
    

    // Create TF-IDF vector
    const tfidfVector = Array(Object.keys(vocabulary).length).fill(0);

    // Calculate TF-IDF for each token
    stemmedTokens.forEach(token => {
        const index = vocabulary[token];
        if (index !== undefined) {
            tfidfVector[index] += idf[index];
        }
    });

    return tfidfVector;
};

// Calculate cosine similarity between two vectors
const calculateCosineSimilarity = (vector1: number[], vector2: number[]) => {
    if (vector1.length !== vector2.length) {
        throw new Error('Vector dimensions do not match');
    }

    // Calculate dot product
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
        dotProduct += vector1[i] * vector2[i];
    }

    // Calculate magnitudes
    const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));

    // Calculate cosine similarity
    const similarity = dotProduct / (magnitude1 * magnitude2);

    return similarity;
};

// Linear kernel calculation (similar to your Jupyter Notebook code)
const linearKernel = (X: any, Y: any) => {
    return X.dot(Y.transpose());
};

export default {
    handleJobsRecommendations
};
