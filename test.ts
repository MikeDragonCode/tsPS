enum QuestionStatus {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    DELETED = 'deleted',
}

async function getFaqs(request : {
    topicId: number,
     status?: QuestionStatus
    }) : Promise<{
        question: string,
        answer: string,
        tags: string[],
        likes: number,
        status: QuestionStatus
    }[]> {
     const response = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify({
            topicId: request.topicId,
            status: request.status,
        })
    });
    const data : {question: string, answer: string, tags: string[], likes: number, status: QuestionStatus}[] = await response.json();
    return data;
}

getFaqs({topicId: 1, status: QuestionStatus.PUBLISHED}).then(data => console.log(data));
