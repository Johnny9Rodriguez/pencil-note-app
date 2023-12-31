#!/bin/zsh

echo "> Starting Pencil Note App Development Environment"

session="pencil-app"

tmux new-session -d -s $session

tmux split-window -h -t $session:0
tmux split-window -v -t $session:0

echo -n "."
tmux send-keys -t $session:0.0 'npm run backend' C-m
sleep 0.5

echo -n "."
tmux send-keys -t $session:0.1 'npm run frontend' C-m
sleep 0.5

echo -n "."
tmux send-keys -t $session:0.2 'npm run tailwind' C-m
sleep 0.5

tmux attach -t $session