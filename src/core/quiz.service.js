import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'https://react-quiz-ee218.firebaseio.com'
});


class QuizService {

  createQuiz(data) {
    return axios.post('/quiz.json', data);
  }

  getListQuiz() {
    return axios.get(`/quiz.json`);

  }

  getQuiz(id) {
    return axios.get(`/quiz/${id}.json`);
  }

}

export default QuizService;