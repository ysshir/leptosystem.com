FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}
COPY ./index.js ./
COPY ./index.js.map ./
CMD ["index.lambdaHandler"]
