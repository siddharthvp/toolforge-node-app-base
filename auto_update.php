<?php

// GitHub hook to automatically pull from the GitHub
// repository every time it is pushed to.

if (isset($_SERVER['HTTP_X_GITHUB_EVENT	'])) {
	`git pull`;
}

?>