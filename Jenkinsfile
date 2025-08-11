pipeline {
  agent any
  options { timestamps(); ansiColor('xterm'); skipDefaultCheckout(true) }

  environment {
    // EDIT THESE
    DOCKERHUB_USER = 'ashoky412'     // <-- change
    IMAGE_NAME     = 'ashok-projects'              // <-- change if repo name differs
    DOCKERHUB_REPO = "${DOCKERHUB_USER}/${IMAGE_NAME}"

    SHORT_SHA = ''
    IMAGE_TAG = ''
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.SHORT_SHA = sh(script: "git rev-parse --short=7 HEAD", returnStdout: true).trim()
          def safeBranch = env.BRANCH_NAME.replaceAll('[^A-Za-z0-9_.-]', '-')
          env.IMAGE_TAG  = "${safeBranch}-${env.BUILD_NUMBER}-${env.SHORT_SHA}"
          echo "IMAGE_TAG = ${env.IMAGE_TAG}"
        }
      }
    }

    stage('Build (optional)') {
      when { expression { fileExists('package.json') || fileExists('pom.xml') || fileExists('Makefile') } }
      steps {
        sh '''
          set -e
          if [ -f package.json ] && command -v npm >/dev/null; then
            npm ci || npm install
            npm run build || true
          fi
          if [ -f pom.xml ] && command -v mvn >/dev/null; then
            mvn -B -DskipTests package
          fi
          if [ -f Makefile ]; then
            make build || true
          fi
        '''
      }
    }

    stage('Docker Build') {
      steps {
        sh '''
          set -e
          echo "Building ${DOCKERHUB_REPO}:${IMAGE_TAG}"
          docker build -t ${DOCKERHUB_REPO}:${IMAGE_TAG} .
        '''
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DU', passwordVariable: 'DP')]) {
          sh '''
            set -e
            echo "$DP" | docker login -u "$DU" --password-stdin
            docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}
            docker logout
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Pushed: ${env.DOCKERHUB_REPO}:${env.IMAGE_TAG}"
    }
  }
}
