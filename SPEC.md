# Especificação - To-Do List

## Objetivo:
Construir uma aplicação web simples para gerenciamento de tarefas.

## Requisitos funcionais:

### RF01 — Criar tarefa
O usuário deve poder criar uma tarefa informando seu título.

- Título é obrigatório.
- Título deve possuir no máximo 100 caracteres.
- Após criar a tarefa, ela deve aparecer imediatamente na lista.

### RF02 — Listar tarefas
A aplicação deve exibir todas as tarefas cadastradas.

Cada tarefa deve apresentar:
- título;
- estado.

Os estados possíveis são:
- Pendente;
- Concluída.

### RF03 — Concluir tarefa
Cada tarefa deve possuir uma caixa de seleção.

Ao selecionar a caixa:
- a tarefa deve mudar para o estado "Concluída";
- o título deve aparecer riscado.

Ao desmarcar:
- a tarefa deve voltar para "Pendente";
- o título deve voltar à aparência normal.

### RF04 — Excluir tarefa
Cada tarefa deve possuir um botão "Excluir".

Ao clicar no botão:
- a tarefa deve ser removida imediatamente;
- não deve ser exibida uma confirmação.

### RF05 — Persistência
As tarefas devem ser armazenadas utilizando localStorage.

Ao atualizar ou fechar e abrir novamente a página, as tarefas devem permanecer disponíveis.

## Interface

A aplicação deve possuir:
- campo para título da tarefa;
- botão "Adicionar";
- lista de tarefas;
- indicação visual das tarefas concluídas.

A interface deve funcionar em desktop e dispositivos móveis.

## Critérios de aceitação

1. Não é possível criar uma tarefa sem título.
2. Uma tarefa válida aparece imediatamente após ser criada.
3. Uma tarefa pode ser marcada e desmarcada como concluída.
4. Uma tarefa pode ser excluída.
5. As tarefas permanecem após atualizar a página.
6. O estado "Concluída" também permanece após atualizar a página.
