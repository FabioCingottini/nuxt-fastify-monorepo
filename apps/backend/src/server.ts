  import {fastify} from "fastify";
  import fastifyCors from '@fastify/cors'; // Import the CORS plugin
  import {TasksFacade} from "./tasks-facade";
  import {z} from "zod";

  const app = fastify({
    logger: true,
  });

  // Register the CORS plugin with desired options
  app.register(fastifyCors, {
    // Allow requests from specific origins
    origin: ['http://localhost:3000'], // Replace with the origin(s) you want to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });


  // Handle task listing
  app.get("/tasks", async (_, reply) => {
    const allTasks = new TasksFacade().getTasks();

    return reply.send(allTasks);
  });

  // Handle single task retrieval
  const paramsGetTaskSchema = z.object({
    id: z.string(),
  });
  app.get<{ Params: z.infer<typeof paramsGetTaskSchema>}>("/tasks/:id", async (request, reply) => {
    const idToValidate = request.params;

    const validation = paramsGetTaskSchema.safeParse(idToValidate);
    if (!validation.success) {
      return reply.status(400).send({message: "Bad request"});
    }

    const task = new TasksFacade().getTask(validation.data.id);
    if (!task) {
      return reply.status(404).send({message: "Not found"});
    }

    return reply.send(task);
  });

  // Handle task creation
  const bodyPostTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
  });
  app.post<{ Body: z.infer<typeof bodyPostTaskSchema> }>("/tasks", async (request, reply) => {
    const taskToValidate = request.body;

    const validation = bodyPostTaskSchema.safeParse(taskToValidate);
    if (!validation.success) {
      return reply.status(400).send({message: "Bad request"});
    }

    const createdTask = new TasksFacade().createTask(validation.data);

    return reply.send(createdTask);
  });

  // Handle task update
  const paramsPutTaskSchema = z.object({
    id: z.string(),
  });
  const bodyPutTaskSchema = z.union([
    z.object({
      title: z.string(),
    }),
    z.object({
      description: z.string(),
    }),
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ]);
  app.put<{ Params: z.infer<typeof paramsPutTaskSchema> }>("/tasks/:id", async (request, reply) => {
    const idToValidate = request.params;
    const taskToValidate = request.body;

    const idValidation = paramsPutTaskSchema.safeParse(idToValidate);
    const bodyValidation = bodyPutTaskSchema.safeParse(taskToValidate);


    if (!bodyValidation.success) {
      return reply.status(400).send({message: "Bad request"});
    }
    if (!idValidation.success || !bodyValidation.success) {
      return reply.status(400).send({message: "Bad request"});
    }


    const updatedTask = new TasksFacade().updateTask(idValidation.data.id, bodyValidation.data);
    if (!updatedTask) {
      return reply.status(404).send({message: "Not found"});
    }

    return reply.send(updatedTask);
  });

  // Handle task deletion
  const paramsDeleteTaskSchema = z.object({
    id: z.string(),
  });
  app.delete<{ Params: z.infer<typeof paramsDeleteTaskSchema> }>("/tasks/:id", async (request, reply) => {
    const idToValidate = request.params;

    const validation = paramsDeleteTaskSchema.safeParse(idToValidate);
    if (!validation.success) {
      return reply.status(400).send({message: "Bad request"});
    }

    const wasDeleted = new TasksFacade().deleteTask(validation.data.id);
    if (!wasDeleted) {
      return reply.status(404).send({message: "Not found"});
    }

    return reply.status(204).send();
  });

  const start = async () => {
    try {
      const address = "0.0.0.0:3001";
      await app.listen({port: 3001, host: "0.0.0.0"});
      console.log(`Server is running at http://${address}`);
    } catch (err) {
      app.log.error(err);
    }
  };

  start();
