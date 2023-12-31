#!/bin/zsh

print_hashes() {
  echo -n "# "
  for i in {1..10}
  do
    echo -n "."
    sleep 0.4
  done
}

echo "> Starting Pencil Note App Development Environment"

session="pencil-app"

tmux new-session -d -s $session

tmux split-window -h -t $session:0
tmux split-window -v -t $session:0

tmux send-keys -t $session:0.0 'npm run backend' C-m
tmux send-keys -t $session:0.1 'npm run frontend' C-m
tmux send-keys -t $session:0.2 'npm run tailwind' C-m

print_hashes

tmux attach -t $session