pipeline {
  agent any
  options { timestamps(); skipDefaultCheckout(true) }

  environment {
    DOCKERHUB_USER = 'ashoky412'
    IMAGE_NAME     = 'ashok-projects'
    DOCKERHUB_REPO = "${DOCKERHUB_USER}/${IMAGE_NAME}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Compute Tag') {
      steps {
        script {
          // Always produce a non-empty, registry-safe tag
          def sha  = sh(script: "git rev-parse --short=7 HEAD", returnStdout: true).trim()
          def br   = (env.BRANCH_NAME ?: sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim())
          def safe = br.replaceAll(/[^A-Za-z0-9_.-]/, '-')
          def bn   = (env.BUILD_NUMBER ?: "0")
          env.IMAGE_TAG = "${safe}-${bn}-${sha}"
          if (!env.IMAGE_TAG?.trim()) { error "IMAGE_TAG is empty — refusing to build" }
          echo "Docker image → ${env.DOCKERHUB_REPO}:${env.IMAGE_TAG}"
        }
      }
    }

    stage('Docker Build') {
      steps {
        sh '''
          set -e
          test -n "${IMAGE_TAG}" || (echo "Empty IMAGE_TAG" && exit 1)
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
    success { echo "Pushed: ${DOCKERHUB_REPO}:${IMAGE_TAG}" }
  }
}
