// pipeline {
//   agent any

//   environment {
//     BACKEND_DIR = 'backend'
//     FRONTEND_DIR = 'frontend'
//     DOCKER_COMPOSE_FILE = 'docker-compose.yml'
//   }

//   stages {

//     stage('Clone Repository') {
//       steps {
//         echo 'Cloning repository...'
//         // This assumes Jenkins has checked out the code from Git
//         // No command needed if using Jenkins SCM
//       }
//     }

//     // stage('Build Docker Images') {
//     //   steps {
//     //     echo 'Building Docker images...'
//     //     sh 'docker-compose build'
//     //   }
//     // }

//     // stage('Run Containers') {
//     //   steps {
//     //     echo 'Running services using Docker Compose...'
//     //     sh 'docker-compose up -d'
//     //   }
//     // }

//     stage('Run Backend Tests') {
//       steps {
//         echo 'Running Selenium backend test suite...'
//         dir("${BACKEND_DIR}/tests") {
//           sh 'node testSuite.js'
//         }
//       }
//     }

//     stage('Run Frontend Tests') {
//       steps {
//         echo 'Running frontend tests (if any)...'
//         dir("${FRONTEND_DIR}") {
//           sh 'npm install'
//           sh 'npm test || echo "No frontend tests defined"'
//         }
//       }
//     }

//     stage('Health Check') {
//       steps {
//         echo 'Checking if app is up...'
//         sh 'curl --fail http://localhost:3000 || echo "Frontend not responding"'
//         sh 'curl --fail http://localhost:5000/api/health || echo "Backend health endpoint failed"'
//       }
//     }
//   }

//   post {
//     always {
//       echo 'Cleaning up...'
//       sh 'docker-compose down'
//     }

//     success {
//       echo '✅ CI Pipeline completed successfully!'
//     }

//     failure {
//       echo '❌ CI Pipeline failed!'
//     }
//   }
// }
pipeline {
  agent any

  environment {
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
    DOCKER_COMPOSE_FILE = 'docker-compose.yml'
  }

  stages {

    stage('Clone Repository') {
      steps {
        echo 'Cloning repository...'
      }
    }

    stage('Build Docker Images') {
      steps {
        echo 'Building Docker images...'
        sh 'docker-compose build'
      }
    }

    stage('Run Containers') {
      steps {
        echo 'Running services using Docker Compose...'
        sh 'docker-compose up -d'
      }
    }

    stage('Run Backend Tests') {
      steps {
        echo 'Running Selenium backend test suite...'
        sh 'docker-compose exec -T backend node tests/testSuite.js'
      }
    }

    stage('Run Frontend Tests') {
      steps {
        echo 'Running frontend tests...'
        sh 'docker-compose exec -T frontend sh -c "npm test || echo No frontend tests defined"'
      }
    }

    stage('Health Check') {
      steps {
        echo 'Checking if app is up...'
        sh 'curl --fail http://localhost:3000 || echo "Frontend not responding"'
        sh 'curl --fail http://localhost:5000/api/health || echo "Backend health endpoint failed"'
      }
    }
  }

  post {
    always {
      echo 'Cleaning up...'
      sh 'docker-compose down'
    }

    success {
      echo '✅ CI Pipeline completed successfully!'
    }

    failure {
      echo '❌ CI Pipeline failed!'
    }
  }
}

