// Part 3: Matrix and Grid (11) + Hash Map (4) + Union-Find (4) + Linked List (15) = 34 questions
const QUESTIONS_PART3 = [
// ─── MATRIX AND GRID ────────────────────────────────────────────────────────
{
  id: 36, title: "Valid Sudoku", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/",
  description: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to standard Sudoku rules: each row, column, and 3x3 sub-box must contain digits 1-9 without repetition.\n\nExample:\nInput: board = 9x9 board\nOutput: true",
  intuition: "Check each number's presence across three domains: its row, its column, and its 3x3 box. Encode each occurrence or use boolean tracking arrays for row, col, and box.",
  approach: "1. Maintain three boolean arrays: rows[9][9], cols[9][9], and boxes[9][9].\n2. For each cell (r, c) with value val != '.':\n   - Digit index d = val - '1'.\n   - Box index b = (r / 3) * 3 + (c / 3).\n   - If rows[r][d], cols[c][d], or boxes[b][d] is already true, return false.\n   - Otherwise, set all three to true.\n3. Return true if no conflicts.",
  javaSolution: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        boolean[][] rows = new boolean[9][9];
        boolean[][] cols = new boolean[9][9];
        boolean[][] boxes = new boolean[9][9];

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;
                int d = board[r][c] - '1';
                int b = (r / 3) * 3 + (c / 3); // 3x3 sub-box index

                if (rows[r][d] || cols[c][d] || boxes[b][d]) return false;

                rows[r][d] = true;
                cols[c][d] = true;
                boxes[b][d] = true;
            }
        }
        return true;
    }
}`,
  complexity: { time: "O(1) (fixed 81 cells)", space: "O(1) (fixed tracking arrays)" },
  simpleExplanation: "1. Walk through the 9x9 board.\n2. For each number, check if it has already appeared in the same row, same column, or same 3x3 sub-box.\n3. If it has, board is invalid. If not, record it and keep checking.",
  hints: ["Box index formula: (r / 3) * 3 + (c / 3)", "Only check filled cells", "Boolean arrays are faster than HashSets"],
  interviewNotes: ["Notice the box indexing arithmetic: (r / 3) * 3 + (c / 3)", "Problem only asks if the current state is valid, not if it is solvable", "Constant space O(1) and time O(1) due to fixed 9x9 dimensions"],
  oneLineAnswer: "Validate uniqueness for each filled digit in its row, column, and 3x3 box (r/3*3 + c/3) using boolean arrays.",
  edgeCases: ["Empty board filled with '.' is valid", "Board with only one digit placed", "Duplicate in the same 3x3 box across different rows/cols"],
  similar: [{id: 37, title: "Sudoku Solver"}]
},
{
  id: 54, title: "Spiral Matrix", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/",
  description: "Given an m x n matrix, return all elements of the matrix in spiral order.\n\nExample:\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]",
  intuition: "Maintain four boundaries: top, bottom, left, right. Traverse top row rightward, right column downward, bottom row leftward, and left column upward. Shrink boundaries inward after each pass.",
  approach: "1. Define top = 0, bottom = m - 1, left = 0, right = n - 1.\n2. Loop while top <= bottom and left <= right:\n   - Traverse left to right along top; top++.\n   - Traverse top to bottom along right; right--.\n   - If top <= bottom: traverse right to left along bottom; bottom--.\n   - If left <= right: traverse bottom to top along left; left++.\n3. Return result list.",
  javaSolution: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) res.add(matrix[top][c]);
            top++;

            for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);
            right--;

            if (top <= bottom) { // check boundary before moving left
                for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);
                bottom--;
            }

            if (left <= right) { // check boundary before moving up
                for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);
                left++;
            }
        }
        return res;
    }
}`,
  complexity: { time: "O(m * n)", space: "O(1) extra space (excluding output)" },
  simpleExplanation: "1. Set 4 walls: top, bottom, left, right.\n2. Walk along the top wall, then push it down.\n3. Walk down right wall, push it left.\n4. Walk along bottom wall, push it up.\n5. Walk up left wall, push it right. Repeat until walls meet.",
  hints: ["Keep 4 boundary pointers: top, bottom, left, right", "Check top <= bottom before going left", "Check left <= right before going up"],
  interviewNotes: ["Common pitfall: forgetting the condition checks before bottom and left traversals", "Can also be done with direction vectors and visited matrix, but 4 boundaries is O(1) space", "Handles non-square rectangular matrices cleanly"],
  oneLineAnswer: "Maintain 4 shrinking boundaries (top, bottom, left, right) and cycle clockwise until pointers cross.",
  edgeCases: ["Single row matrix", "Single column matrix", "Single element matrix"],
  similar: [{id: 59, title: "Spiral Matrix II"}]
},
{
  id: 48, title: "Rotate Image", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/rotate-image/",
  description: "You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees clockwise in-place.\n\nExample:\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]",
  intuition: "A 90-degree clockwise rotation is equivalent to two simple operations: transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row horizontally.",
  approach: "1. Transpose the matrix: swap matrix[i][j] with matrix[j][i] for all j > i.\n2. Reverse each row: for each row, swap elements from both ends using two pointers.",
  javaSolution: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // Step 1: Transpose matrix across main diagonal
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Step 2: Reverse each row horizontally
        for (int i = 0; i < n; i++) {
            int l = 0, r = n - 1;
            while (l < r) {
                int temp = matrix[i][l];
                matrix[i][l++] = matrix[i][r];
                matrix[i][r--] = temp;
            }
        }
    }
}`,
  complexity: { time: "O(n²)", space: "O(1) in-place" },
  simpleExplanation: "1. Flip the matrix along its main diagonal (transpose).\n2. Flip every row horizontally from left to right.\n3. The result is exactly a 90-degree clockwise turn.",
  hints: ["Rotate clockwise = Transpose + Reverse rows", "Rotate counter-clockwise = Transpose + Reverse columns", "Must be done in-place"],
  interviewNotes: ["Transpose + reflect trick is much easier to code bug-free than 4-way cyclic swapping", "Remember j starts from i + 1 during transpose to avoid double swapping back", "Guaranteed O(1) memory"],
  oneLineAnswer: "Transpose the matrix across its main diagonal, then reverse each row horizontally.",
  edgeCases: ["1x1 matrix: unchanged", "2x2 matrix smallest non-trivial", "Even vs odd n dimensions"],
  similar: [{id: 54, title: "Spiral Matrix"}]
},
{
  id: 73, title: "Set Matrix Zeroes", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
  description: "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0 in-place with O(1) space.\n\nExample:\nInput: matrix = [[1,1,1],[1,0,1],[1,1,1]]\nOutput: [[1,0,1],[0,0,0],[1,0,1]]",
  intuition: "Instead of extra arrays to record which rows/cols should be zeroed, use the first row and first column of the matrix itself as markers. Use a single boolean to remember if the first column itself originally had a zero.",
  approach: "1. Track col0Zero = false.\n2. Iterate through matrix: if cell (r, c) is 0, set matrix[r][0] = 0 and matrix[0][c] = 0 (if c == 0, set col0Zero = true).\n3. Traverse backwards from bottom-right to row 0, col 1: if row marker or col marker is 0, set cell to 0.\n4. If col0Zero is true, zero out matrix[r][0].",
  javaSolution: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean firstColZero = false;

        for (int r = 0; r < m; r++) {
            if (matrix[r][0] == 0) firstColZero = true;
            for (int c = 1; c < n; c++) {
                if (matrix[r][c] == 0) {
                    matrix[r][0] = 0; // mark row
                    matrix[0][c] = 0; // mark col
                }
            }
        }

        // Apply zeroes from bottom-right up to avoid overwriting markers prematurely
        for (int r = m - 1; r >= 0; r--) {
            for (int c = n - 1; c >= 1; c--) {
                if (matrix[r][0] == 0 || matrix[0][c] == 0) {
                    matrix[r][c] = 0;
                }
            }
            if (firstColZero) matrix[r][0] = 0;
        }
    }
}`,
  complexity: { time: "O(m * n)", space: "O(1) auxiliary space" },
  simpleExplanation: "1. Use the first row and first column to store markers for which lines need to be wiped.\n2. Keep one flag for whether column 0 itself had a zero.\n3. Iterate backwards and set cells to 0 if their row/col marker is 0.",
  hints: ["Use row 0 and col 0 as storage", "Iterate backwards when applying zeroes to avoid corrupting markers", "Separate flag for column 0"],
  interviewNotes: ["O(m+n) space with row/col boolean arrays is acceptable as first step, but O(1) space using first row/col is the gold standard", "Processing backwards ensures we don't zero out marker cells before reading them", "A classic interview in-place state encoding question"],
  oneLineAnswer: "Use row 0 and col 0 as markers for zeroing, tracking col 0 state with a single boolean flag for O(1) space.",
  edgeCases: ["First row or first column itself contains zero", "All zeros or no zeros in matrix", "1x1 matrix"],
  similar: [{id: 289, title: "Game of Life"}]
},
{
  id: 289, title: "Game of Life", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/game-of-life/",
  description: "According to Conway's Game of Life rules, update the board simultaneously in-place to its next state.\n\nExample:\nInput: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]\nOutput: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
  intuition: "Cells change state simultaneously. To do this in-place without copying the board, use extra transition state values: 2 = died (was 1, now 0), -1 = revived (was 0, now 1). In the final pass, map 2->0 and -1->1.",
  approach: "1. For each cell, count live neighbors among all 8 adjacent directions (count cells with value > 0, i.e., 1 or 2).\n2. If cell == 1 and live neighbors < 2 or > 3, mark as 2 (dies).\n3. If cell == 0 and live neighbors == 3, mark as -1 (becomes live).\n4. In a second pass: if cell == 2 set to 0; if cell == -1 set to 1.",
  javaSolution: `class Solution {
    public void gameOfLife(int[][] board) {
        int m = board.length, n = board[0].length;
        int[] dirs = {-1, 0, 1};

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int liveNeighbors = 0;
                for (int dr : dirs) {
                    for (int dc : dirs) {
                        if (dr == 0 && dc == 0) continue;
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                            // 1 was live, 2 was live but will die
                            if (board[nr][nc] == 1 || board[nr][nc] == 2) liveNeighbors++;
                        }
                    }
                }
                if (board[r][c] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                    board[r][c] = 2; // live -> dead
                } else if (board[r][c] == 0 && liveNeighbors == 3) {
                    board[r][c] = -1; // dead -> live
                }
            }
        }

        // Final normalization pass
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 2) board[r][c] = 0;
                else if (board[r][c] == -1) board[r][c] = 1;
            }
        }
    }
}`,
  complexity: { time: "O(m * n)", space: "O(1) in-place" },
  simpleExplanation: "1. Check every cell and count its 8 neighbors.\n2. Instead of immediately writing 0 or 1, use temporary codes (2 for live-turning-dead, -1 for dead-turning-alive).\n3. In a second pass, replace temporary codes with actual 0 and 1.",
  hints: ["State encoding trick for in-place modifications", "Live in previous state: value == 1 || value == 2", "Decode in final pass"],
  interviewNotes: ["Bit manipulation alternative: use 2nd bit to store next state (val | (next_val << 1))", "Infinite board follow-up: sparse matrix using HashSet of live cell coordinates", "Standard cellular automaton implementation"],
  oneLineAnswer: "Encode state transitions using temporary values (2: live->dead, -1: dead->live) to update in-place in O(1) space.",
  edgeCases: ["Corner cells with only 3 neighbors", "All dead cells", "Oscillating patterns"],
  similar: [{id: 73, title: "Set Matrix Zeroes"}]
},
{
  id: 909, title: "Snakes and Ladders", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/snakes-and-ladders/",
  description: "Find the least number of dice rolls to reach square n² from square 1 on an n x n Boustrophedon board. If impossible, return -1.\n\nExample:\nInput: board = 6x6 board with snakes/ladders\nOutput: 4",
  intuition: "Shortest path on unweighted graph -> BFS. Model square numbers 1 to n² as graph vertices. Each dice roll explores next 1..6 squares. If a snake or ladder exists at destination, take it immediately.",
  approach: "1. Helper getCoord(s, n) maps 1D square index (1-indexed) to (row, col) on Boustrophedon grid.\n2. BFS starting at square 1 with dist = 0, track visited array.\n3. For each state, roll dice 1..6: next square nextS = curr + roll.\n4. Check if snake/ladder exists: if board[r][c] != -1, destination = board[r][c].\n5. If destination == n², return dist + 1.\n6. Return -1 if queue empties without reaching n².",
  javaSolution: `class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length, target = n * n;
        boolean[] visited = new boolean[target + 1];
        Queue<int[]> q = new ArrayDeque<>(); // [square, rolls]
        q.offer(new int[]{1, 0});
        visited[1] = true;

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int s = curr[0], dist = curr[1];
            if (s == target) return dist;

            for (int i = 1; i <= 6 && s + i <= target; i++) {
                int next = s + i;
                int[] rc = getCoord(next, n);
                int dest = board[rc[0]][rc[1]] != -1 ? board[rc[0]][rc[1]] : next;

                if (!visited[dest]) {
                    visited[dest] = true;
                    q.offer(new int[]{dest, dist + 1});
                }
            }
        }
        return -1;
    }

    private int[] getCoord(int s, int n) {
        int r = (s - 1) / n;
        int c = (s - 1) % n;
        int row = n - 1 - r;
        int col = (r % 2 == 0) ? c : (n - 1 - c); // zigzag alternating rows
        return new int[]{row, col};
    }
}`,
  complexity: { time: "O(n²)", space: "O(n²)" },
  simpleExplanation: "1. Convert the 2D zig-zag board coordinates to simple numbers from 1 to n².\n2. Use Breadth-First Search (BFS) to find the shortest number of dice rolls to the end.\n3. If landing on a ladder or snake, slide to destination immediately.",
  hints: ["Unweighted shortest path = BFS", "Boustrophedon board alternates column direction every row", "Do not chain snakes/ladders (rules say take at most one jump per roll)"],
  interviewNotes: ["Coordinate conversion formula is the most error-prone part; test carefully", "Only mark visited[dest] = true, not visited[next]", "Standard BFS guarantees shortest path"],
  oneLineAnswer: "BFS from square 1 to n² testing dice rolls 1..6, resolving snake/ladder jumps immediately.",
  edgeCases: ["Square 1 itself has a ladder (must NOT take on game start according to rules, only after roll)", "Target unreachable -> return -1", "Multiple ladders leading to same square"],
  similar: [{id: 127, title: "Word Ladder"}]
},
{
  id: 427, title: "Construct Quad Tree", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/construct-quad-tree/",
  description: "Given an n x n matrix of 0s and 1s, construct a QuadTree representing the grid. If all values in current block are equal, make it a leaf node. Otherwise, recursively subdivide into 4 sub-quadrants.\n\nExample:\nInput: grid = [[0,1],[1,0]]\nOutput: QuadTree root",
  intuition: "Divide and conquer: recursively check if all cells in current subgrid are identical. If yes, return leaf node. If not, divide into top-left, top-right, bottom-left, bottom-right subgrids.",
  approach: "1. Helper build(r, c, len):\n2. Check if all cells in grid[r..r+len-1][c..c+len-1] match grid[r][c].\n3. If all same: return new Node(grid[r][c] == 1, true).\n4. Otherwise: half = len / 2, construct 4 children recursively, and return new Node(true, false, tl, tr, bl, br).",
  javaSolution: `class Solution {
    public Node construct(int[][] grid) {
        return build(grid, 0, 0, grid.length);
    }

    private Node build(int[][] grid, int r, int c, int len) {
        if (isAllSame(grid, r, c, len)) {
            return new Node(grid[r][c] == 1, true); // isLeaf = true
        }
        int half = len / 2;
        Node tl = build(grid, r, c, half);
        Node tr = build(grid, r, c + half, half);
        Node bl = build(grid, r + half, c, half);
        Node br = build(grid, r + half, c + half, half);
        return new Node(true, false, tl, tr, bl, br); // internal node
    }

    private boolean isAllSame(int[][] grid, int r, int c, int len) {
        int val = grid[r][c];
        for (int i = r; i < r + len; i++) {
            for (int j = c; j < c + len; j++) {
                if (grid[i][j] != val) return false;
            }
        }
        return true;
    }
}`,
  complexity: { time: "O(n² log n)", space: "O(log n) recursion stack" },
  simpleExplanation: "1. Check if all squares in the current block are identical.\n2. If they are, make a single leaf node.\n3. If they differ, chop the block into 4 quadrants and repeat.",
  hints: ["Recursive divide and conquer", "len / 2 splits coordinates into 4 equal quadrants", "Check homogeneity before recursing"],
  interviewNotes: ["Base case is when len == 1 or all cells in the quadrant are identical", "Quad-trees are heavily used in spatial indexing, image compression, and GIS systems", "n is always a power of 2"],
  oneLineAnswer: "Divide and conquer: if current subgrid has identical values, return a leaf; else recursively build 4 quadrants.",
  edgeCases: ["1x1 grid base case", "Entire grid is all 1s or all 0s", "Checkerboard pattern with maximum tree depth"],
  similar: []
},
{
  id: 74, title: "Search a 2D Matrix", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
  description: "Given an m x n integer matrix with sorted rows where the first integer of each row is greater than the last integer of the previous row, return true if target is in matrix in O(log(m*n)) time.\n\nExample:\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\nOutput: true",
  intuition: "Because the matrix is completely sorted row-wise and across rows, treat the entire 2D matrix as a virtual 1D sorted array of length m * n. Binary search directly.",
  approach: "1. low = 0, high = m * n - 1.\n2. While low <= high:\n   - mid = low + (high - low) / 2.\n   - Convert mid to 2D coordinates: row = mid / n, col = mid % n.\n   - If matrix[row][col] == target return true.\n   - If < target, low = mid + 1; else high = mid - 1.\n3. Return false.",
  javaSolution: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int low = 0, high = m * n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int r = mid / n, c = mid % n; // virtual 1D to 2D coordinate mapping
            if (matrix[r][c] == target) return true;
            else if (matrix[r][c] < target) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
}`,
  complexity: { time: "O(log(m * n))", space: "O(1)" },
  simpleExplanation: "1. Imagine unwrapping the matrix into one long flat sorted line.\n2. Run standard binary search on this imaginary array.\n3. Map index mid to row = mid / cols and col = mid % cols.",
  hints: ["Virtual 1D array index: row = mid / n, col = mid % n", "Standard binary search", "Strictly O(log(m*n))"],
  interviewNotes: ["Notice difference from Search a 2D Matrix II (where rows/cols are sorted independently)", "Mapping mid to (mid / n, mid % n) avoids actual array flattening", "Must check for overflow: low + (high - low) / 2"],
  oneLineAnswer: "Treat 2D matrix as virtual 1D array of length m*n; binary search with row = mid/n and col = mid%n.",
  edgeCases: ["Single element matrix", "Target smaller than minimum element", "Target larger than maximum element"],
  similar: [{id: 240, title: "Search a 2D Matrix II"}, {id: 35, title: "Search Insert Position"}]
},
{
  id: 64, title: "Minimum Path Sum", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/",
  description: "Given an m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path. You can only move down or right.\n\nExample:\nInput: grid = [[1,3,1],[1,5,1],[4,2,1]]\nOutput: 7 (1->3->1->1->1)",
  intuition: "2D DP: min path to cell (r, c) is grid[r][c] + min(path from top, path from left). Can be optimized to 1D DP or computed in-place in grid.",
  approach: "1. Base case: grid[0][0] stays as is.\n2. Initialize first row: grid[0][c] += grid[0][c-1].\n3. Initialize first col: grid[r][0] += grid[r-1][0].\n4. For remaining cells: grid[r][c] += min(grid[r-1][c], grid[r][c-1]).\n5. Return grid[m-1][n-1].",
  javaSolution: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;

        // Initialize first row (can only come from left)
        for (int c = 1; c < n; c++) grid[0][c] += grid[0][c - 1];
        // Initialize first col (can only come from above)
        for (int r = 1; r < m; r++) grid[r][0] += grid[r - 1][0];

        // Fill remaining grid using top and left neighbors
        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                grid[r][c] += Math.min(grid[r - 1][c], grid[r][c - 1]);
            }
        }
        return grid[m - 1][n - 1];
    }
}`,
  complexity: { time: "O(m * n)", space: "O(1) in-place" },
  simpleExplanation: "1. For top edge, you can only move right.\n2. For left edge, you can only move down.\n3. For every other square, add its value to the smaller of its top or left neighbor.",
  hints: ["In-place DP saves space", "Each cell only depends on (r-1, c) and (r, c-1)", "Handle boundaries first"],
  interviewNotes: ["In-place modification gives O(1) auxiliary space", "If input cannot be modified, 1D array of size n achieves O(n) space", "Identical DP pattern to Unique Paths"],
  oneLineAnswer: "dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]) computed in-place.",
  edgeCases: ["Single row or column", "All equal weights", "Large values with potential sum considerations"],
  similar: [{id: 62, title: "Unique Paths"}, {id: 63, title: "Unique Paths II"}]
},
{
  id: 63, title: "Unique Paths II", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/unique-paths-ii/",
  description: "Find number of unique paths from top-left to bottom-right in a grid where 1 represents an obstacle and 0 an open space. Can only move down or right.\n\nExample:\nInput: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\nOutput: 2",
  intuition: "DP: If cell is an obstacle, dp[c] = 0 (no paths through it). Otherwise, paths to (r, c) = paths from top + paths from left. A 1D array of size n suffices.",
  approach: "1. If start or end is obstacle (grid[0][0] == 1), return 0.\n2. Use 1D array dp of size n. dp[0] = 1.\n3. For each row:\n   - For each col:\n     - If obstacle: dp[c] = 0.\n     - Else if c > 0: dp[c] += dp[c-1].\n4. Return dp[n-1].",
  javaSolution: `class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int n = obstacleGrid[0].length;
        int[] dp = new int[n];
        dp[0] = (obstacleGrid[0][0] == 0) ? 1 : 0;

        for (int[] row : obstacleGrid) {
            for (int c = 0; c < n; c++) {
                if (row[c] == 1) {
                    dp[c] = 0; // obstacle blocks all paths through this cell
                } else if (c > 0) {
                    dp[c] += dp[c - 1]; // paths from above (already in dp[c]) + left
                }
            }
        }
        return dp[n - 1];
    }
}`,
  complexity: { time: "O(m * n)", space: "O(n) 1D rolling array" },
  simpleExplanation: "1. Keep a 1D array representing the number of paths to each column in the current row.\n2. When you hit a rock (1), set paths to 0.\n3. Otherwise, add the paths coming from the left to the paths coming from above.",
  hints: ["1D array rolling DP", "Obstacle cell always has 0 paths", "Check obstacleGrid[0][0] == 1 base case"],
  interviewNotes: ["1D space optimization is clean and impresses interviewers", "Be sure to handle start or end being an obstacle", "Space complexity drops from O(m*n) to O(n)"],
  oneLineAnswer: "Rolling 1D DP: dp[c] = 0 on obstacles, else dp[c] += dp[c-1] representing sum of top and left paths.",
  edgeCases: ["Start cell has obstacle: return 0", "End cell has obstacle: return 0", "No path possible (surrounded by obstacles)"],
  similar: [{id: 62, title: "Unique Paths"}, {id: 64, title: "Minimum Path Sum"}]
},
{
  id: 221, title: "Maximal Square", topic: "Matrix and Grid", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/maximal-square/",
  description: "Given an m x n binary matrix filled with 0s and 1s, find the largest square containing only 1s and return its area.\n\nExample:\nInput: matrix = [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]\nOutput: 4",
  intuition: "dp[r][c] represents the side length of the maximum square whose bottom-right corner is at (r, c). If matrix[r][c] == '1', dp[r][c] = 1 + min(top, left, top-left diagonal).",
  approach: "1. 2D array dp of size (m+1) x (n+1) to handle boundaries cleanly.\n2. maxSide = 0.\n3. For r from 1 to m and c from 1 to n:\n   - If matrix[r-1][c-1] == '1':\n     dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]).\n     maxSide = max(maxSide, dp[r][c]).\n4. Return maxSide * maxSide.",
  javaSolution: `class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] dp = new int[m + 1][n + 1];
        int maxSide = 0;

        for (int r = 1; r <= m; r++) {
            for (int c = 1; c <= n; c++) {
                if (matrix[r - 1][c - 1] == '1') {
                    // Current square side is limited by the smallest adjacent neighbor
                    dp[r][c] = 1 + Math.min(dp[r - 1][c],
                                   Math.min(dp[r][c - 1], dp[r - 1][c - 1]));
                    maxSide = Math.max(maxSide, dp[r][c]);
                }
            }
        }
        return maxSide * maxSide; // return area
    }
}`,
  complexity: { time: "O(m * n)", space: "O(m * n) (or O(n) rolling array)" },
  simpleExplanation: "1. Look at each cell as the bottom-right corner of a potential square.\n2. If it's a '1', its maximum size is 1 + minimum of its top, left, and diagonal neighbors.\n3. Track the largest side length and return side * side for the area.",
  hints: ["dp[r][c] = 1 + min(top, left, diagonal)", "Padding dp table by 1 avoids border checks", "Return maxSide * maxSide for area"],
  interviewNotes: ["Why min of 3 neighbors? A square can only expand if all three adjacent quadrants are complete", "Padding table to (m+1) x (n+1) eliminates edge-case checks for row 0 and col 0", "Can be optimized to O(n) space with two variables"],
  oneLineAnswer: "dp[r][c] = 1 + min(top, left, diagonal) for every '1'; return maxSide squared.",
  edgeCases: ["Matrix with no '1's -> area 0", "Single '1' -> area 1", "Entire matrix is '1's"],
  similar: [{id: 85, title: "Maximal Rectangle"}]
},

// ─── HASH MAP ───────────────────────────────────────────────────────────────
{
  id: 383, title: "Ransom Note", topic: "Hash Map", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/ransom-note/",
  description: "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once.\n\nExample:\nInput: ransomNote = 'aa', magazine = 'aab'\nOutput: true",
  intuition: "Count letter frequencies in magazine. For each letter in ransomNote, decrement its frequency. If any count drops below zero, magazine cannot supply enough letters.",
  approach: "1. Use an int[26] frequency array for magazine letters.\n2. Count all characters in magazine.\n3. Iterate ransomNote: decrement count. If count < 0, return false.\n4. Return true.",
  javaSolution: `class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        if (ransomNote.length() > magazine.length()) return false;
        int[] counts = new int[26];
        for (char c : magazine.toCharArray()) counts[c - 'a']++;
        for (char c : ransomNote.toCharArray()) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
  complexity: { time: "O(m + n)", space: "O(1) fixed 26 array" },
  simpleExplanation: "1. Count how many of each letter you have in the magazine.\n2. For each letter needed in the note, deduct one from your count.\n3. If you run out of any letter, return false.",
  hints: ["26-character frequency array", "Early exit if ransomNote is longer than magazine", "Decrement and check < 0 in one step"],
  interviewNotes: ["26-element array is much faster than HashMap for lowercase English letters", "Early length check is a great initial optimization", "O(1) extra space"],
  oneLineAnswer: "Count magazine characters in a 26-int array; decrement for each ransom note char and return false if count drops below 0.",
  edgeCases: ["ransomNote longer than magazine: immediately false", "Single character match/mismatch", "Duplicate characters required"],
  similar: [{id: 242, title: "Valid Anagram"}]
},
{
  id: 205, title: "Isomorphic Strings", topic: "Hash Map", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/isomorphic-strings/",
  description: "Two strings s and t are isomorphic if the characters in s can be replaced to get t, preserving order. No two characters may map to the same character, but a character may map to itself.\n\nExample:\nInput: s = 'egg', t = 'add'\nOutput: true",
  intuition: "Bijections: characters in s and t must have a one-to-one mapping. Track the last seen position of characters in both strings; they must match at every step.",
  approach: "1. Arrays m1[256] and m2[256] store last seen indices (1-indexed).\n2. For each index i from 0 to n-1:\n   - If m1[s[i]] != m2[t[i]], the character mapping is inconsistent -> return false.\n   - Update m1[s[i]] = i + 1, m2[t[i]] = i + 1.\n3. Return true.",
  javaSolution: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] m1 = new int[256];
        int[] m2 = new int[256];
        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i), c2 = t.charAt(i);
            // If their last seen positions differ, mapping is broken
            if (m1[c1] != m2[c2]) return false;
            m1[c1] = i + 1; // 1-based index to distinguish from default 0
            m2[c2] = i + 1;
        }
        return true;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) fixed 256 array" },
  simpleExplanation: "1. Track the last time each letter appeared in both strings.\n2. Whenever a letter appears, its partner in the other string must have appeared at the exact same previous step.\n3. Any mismatch means mapping isn't 1-to-1.",
  hints: ["Record last-seen indices for both strings", "Use 1-based indexing so 0 remains 'unseen'", "256 array covers full ASCII"],
  interviewNotes: ["One-to-one bijection check: avoids needing two HashMaps with a single last-seen array trick", "1-based index avoids separate Arrays.fill(..., -1)", "Constant O(1) space"],
  oneLineAnswer: "Verify that last-seen indices of s[i] and t[i] match at every index using two 256-int arrays.",
  edgeCases: ["Different characters mapping to the same target ('ab' -> 'aa')", "Same character mapping to different targets", "Strings of length 1"],
  similar: [{id: 290, title: "Word Pattern"}]
},
{
  id: 290, title: "Word Pattern", topic: "Hash Map", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/word-pattern/",
  description: "Given a pattern and a string s, find if s follows the same pattern (bijection between a letter in pattern and a non-empty word in s).\n\nExample:\nInput: pattern = 'abba', s = 'dog cat cat dog'\nOutput: true",
  intuition: "Similar to Isomorphic Strings, but mapping characters to full words. Use a HashMap to map characters to indices and words to indices, or map char->word and word->char simultaneously.",
  approach: "1. Split s by ' ' into words array. If pattern.length() != words.length, return false.\n2. Use a single HashMap<Object, Integer>.\n3. For each i, map.put(pattern.charAt(i), i) and map.put(words[i], i) return previous index for that key.\n4. If previous indices differ, bijection is violated -> return false.\n5. Return true.",
  javaSolution: `class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (words.length != pattern.length()) return false;

        Map<Object, Integer> map = new HashMap<>();
        for (int i = 0; i < words.length; i++) {
            // map.put returns the previous value associated with key, or null
            // Compare using != because autoboxed Integers > 127 are separate objects
            if (!Objects.equals(map.put(pattern.charAt(i), i), map.put(words[i], i))) {
                return false;
            }
        }
        return true;
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Split the string into words.\n2. Ensure the number of words equals pattern length.\n3. Check that the character and word were both last seen at the exact same index.",
  hints: ["Split s by space first", "Length mismatch check first", "Use Objects.equals to safely compare autoboxed Integer values"],
  interviewNotes: ["Notice the Java subtlety: map.put returns Integer objects; use Objects.equals() instead of != to avoid object identity issues when i > 127", "Bijection requires two-way uniqueness", "Single map with Object keys cleanly handles both types"],
  oneLineAnswer: "Split words and verify bidirectional mapping using last-seen indices in a HashMap with Objects.equals.",
  edgeCases: ["Pattern length != word count", "Two pattern characters mapped to the same word ('ab' with 'dog dog')", "i > 127 integer caching trap"],
  similar: [{id: 205, title: "Isomorphic Strings"}]
},
{
  id: 1, title: "Two Sum", topic: "Hash Map", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/two-sum/",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in exactly one pass.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
  intuition: "For each element x, its complement is target - x. Check if the complement is already in our HashMap. If so, return both indices; otherwise, store x and its index.",
  approach: "1. Initialize HashMap<Integer, Integer> map.\n2. For each index i and value nums[i]:\n   - complement = target - nums[i].\n   - If map.containsKey(complement), return new int[]{map.get(complement), i}.\n   - map.put(nums[i], i).\n3. Return empty array if not found.",
  javaSolution: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>(); // val -> index
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Walk through the list with a notepad (HashMap).\n2. For each number, calculate what matching number you need to reach the target.\n3. If that matching number is already in your notepad, you found the pair!",
  hints: ["Target - current = complement", "One-pass hash map: check complement before adding current element", "O(n) time and O(n) space"],
  interviewNotes: ["The foundational DSA question", "Single pass is preferred over two passes (avoids using same element twice)", "Contrast with Two Sum II (which uses two pointers for sorted arrays)"],
  oneLineAnswer: "Single-pass HashMap: store seen numbers and their indices, checking if target - nums[i] is already in the map.",
  edgeCases: ["Pair with same values adding to target (e.g., [3, 3] target 6)", "Negative numbers", "Large integers"],
  similar: [{id: 167, title: "Two Sum II"}, {id: 15, title: "3Sum"}]
},

// ─── UNION-FIND ─────────────────────────────────────────────────────────────
{
  id: 128, title: "Longest Consecutive Sequence", topic: "Union-Find", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
  description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(n) time.\n\nExample:\nInput: nums = [100,4,200,1,3,2]\nOutput: 4 ([1, 2, 3, 4])",
  intuition: "Put all numbers into a HashSet. Only start counting a sequence if x is the beginning of a streak (i.e. x - 1 is NOT in the set). This ensures each number is part of at most one streak expansion.",
  approach: "1. Add all numbers to a HashSet.\n2. maxStreak = 0.\n3. For each x in set:\n   - If !set.contains(x - 1): // x is the start of a streak\n     - curr = x, streak = 1.\n     - While set.contains(curr + 1): curr++, streak++.\n     - maxStreak = max(maxStreak, streak).\n4. Return maxStreak.",
  javaSolution: `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int x : nums) set.add(x);

        int maxStreak = 0;
        for (int x : set) {
            // Only initiate counting if x is the beginning of a streak
            if (!set.contains(x - 1)) {
                int curr = x;
                int streak = 1;
                while (set.contains(curr + 1)) {
                    curr++;
                    streak++;
                }
                maxStreak = Math.max(maxStreak, streak);
            }
        }
        return maxStreak;
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Put all numbers into a Set for fast lookup.\n2. For each number, check if it's the start of a sequence (meaning num - 1 doesn't exist).\n3. If it is the start, count forward 1, 2, 3... until the sequence breaks.\n4. Each number is visited at most twice, keeping it O(n).",
  hints: ["Put all numbers in a HashSet", "Only count upwards if (num - 1) is not in the set", "This condition guarantees O(n) overall time"],
  interviewNotes: ["Why O(n) when there is a nested while loop? The inner loop only runs for streak beginnings, so each element is touched at most twice", "Sorting is O(n log n) and violates problem requirement", "Can also be solved with Union-Find"],
  oneLineAnswer: "Store numbers in a HashSet and only count forward from sequence beginnings (!set.contains(x-1)) for linear time.",
  edgeCases: ["Empty array: return 0", "Duplicate numbers: handled naturally by Set", "Negative numbers and single-element arrays"],
  similar: [{id: 298, title: "Binary Tree Longest Consecutive Sequence"}]
},
{
  id: 200, title: "Number of Islands", topic: "Union-Find", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
  description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nExample:\nInput: grid = [['1','1','0'],['1','1','0'],['0','0','1']]\nOutput: 2",
  intuition: "Treat connected 1s as a connected component. Scan the grid; whenever a '1' is found, increment the island count and use DFS/BFS to sink the entire island by changing all connected '1's to '0's.",
  approach: "1. Iterate r from 0 to m-1 and c from 0 to n-1.\n2. If grid[r][c] == '1':\n   - count++.\n   - dfs(r, c): mark current cell '0', then recursively visit all 4 valid cardinal neighbors.\n3. Return count.",
  javaSolution: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c); // sink the whole island
                }
            }
        }
        return count;
    }

    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') {
            return;
        }
        grid[r][c] = '0'; // mark visited in-place
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,
  complexity: { time: "O(m * n)", space: "O(m * n) worst-case recursion stack" },
  simpleExplanation: "1. Loop through every square of the map.\n2. When you find land ('1'), you discovered a new island: add 1 to count.\n3. Immediately flood the entire island with water ('0') using DFS so you don't count it again.",
  hints: ["DFS or BFS to flood-fill and sink connected land", "Mutate grid in-place to '0' to avoid visited array", "Check 4 directions"],
  interviewNotes: ["Sinking the island in-place saves O(m*n) space for a visited matrix", "Union-Find is an alternative: union adjacent '1's and count disjoint sets", "Very popular foundational graph problem"],
  oneLineAnswer: "Iterate cells: when finding '1', increment island count and flood-fill (sink) the connected component via DFS.",
  edgeCases: ["All water (all '0's) -> 0", "All land (all '1's) -> 1", "Diagonal land cells (do not connect)"],
  similar: [{id: 130, title: "Surrounded Regions"}, {id: 695, title: "Max Area of Island"}]
},
{
  id: 130, title: "Surrounded Regions", topic: "Union-Find", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
  description: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's.\n\nExample:\nInput: board = [['X','X','X'],['X','O','X'],['X','X','X']]\nOutput: [['X','X','X'],['X','X','X'],['X','X','X']]",
  intuition: "Any 'O' connected to the border cannot be surrounded. Instead of finding surrounded regions, find all border-connected 'O's via DFS and mark them safe ('#'). Then flip remaining 'O's to 'X', and restore '#' back to 'O'.",
  approach: "1. Run DFS from all 'O's on the 4 outer borders, marking them as '#'.\n2. Iterate through the entire board:\n   - If cell is 'O', flip to 'X' (captured).\n   - If cell is '#', flip back to 'O' (safe border region).",
  javaSolution: `class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length;

        // DFS from border 'O's along vertical edges
        for (int r = 0; r < m; r++) {
            if (board[r][0] == 'O') dfs(board, r, 0);
            if (board[r][n - 1] == 'O') dfs(board, r, n - 1);
        }
        // DFS from border 'O's along horizontal edges
        for (int c = 0; c < n; c++) {
            if (board[0][c] == 'O') dfs(board, 0, c);
            if (board[m - 1][c] == 'O') dfs(board, m - 1, c);
        }

        // Flip remaining 'O' to 'X', and restore '#' to 'O'
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 'O') board[r][c] = 'X';
                else if (board[r][c] == '#') board[r][c] = 'O';
            }
        }
    }

    private void dfs(char[][] board, int r, int c) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != 'O') {
            return;
        }
        board[r][c] = '#'; // mark as border-connected safe cell
        dfs(board, r + 1, c);
        dfs(board, r - 1, c);
        dfs(board, r, c + 1);
        dfs(board, r, c - 1);
    }
}`,
  complexity: { time: "O(m * n)", space: "O(m * n) recursion stack" },
  simpleExplanation: "1. Any 'O' attached to the outer boundary cannot be captured.\n2. Start DFS from all border 'O's and temporarily paint them with '#'.\n3. Everything still marked 'O' is trapped: flip it to 'X'.\n4. Turn '#' back into 'O'.",
  hints: ["Invert the problem: protect border-connected 'O's instead of searching for surrounded ones", "Mark safe cells with temporary char '#'", "Two-pass in-place solution"],
  interviewNotes: ["Thinking in reverse (protect boundary connected cells) turns a hard search into a clean flood-fill", "Can also connect all border 'O's to a virtual dummy node in Union-Find", "In-place modification eliminates visited matrix"],
  oneLineAnswer: "DFS from all border 'O's marking them '#'; flip all remaining 'O's to 'X', then restore '#' to 'O'.",
  edgeCases: ["Board size <= 2 (all cells are borders -> no captures possible)", "All 'O's or all 'X's", "No border 'O's"],
  similar: [{id: 200, title: "Number of Islands"}]
},
{
  id: 399, title: "Evaluate Division", topic: "Union-Find", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/evaluate-division/",
  description: "You are given equations like A / B = k. Evaluate queries like C / D = ? using given equations. Return -1.0 if answer cannot be determined.\n\nExample:\nInput: equations = [['a','b'],['b','c']], values = [2.0,3.0], queries = [['a','c'],['b','a']]\nOutput: [6.0, 0.5]",
  intuition: "Model as a directed weighted graph where edge A -> B has weight k and B -> A has weight 1/k. Evaluating C / D is finding a path from C to D and multiplying edge weights along the path using DFS.",
  approach: "1. Build an adjacency map: graph.get(A).put(B, k) and graph.get(B).put(A, 1.0 / k).\n2. For each query [src, dst]:\n   - If src or dst is not in graph, result is -1.0.\n   - If src.equals(dst), result is 1.0.\n   - Run DFS from src to dst tracking visited nodes and multiplying edge weights.\n3. Return results array.",
  javaSolution: `class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Map<String, Double>> graph = new HashMap<>();

        // Build graph with forward and reciprocal weights
        for (int i = 0; i < equations.size(); i++) {
            String u = equations.get(i).get(0), v = equations.get(i).get(1);
            double val = values[i];
            graph.computeIfAbsent(u, k -> new HashMap<>()).put(v, val);
            graph.computeIfAbsent(v, k -> new HashMap<>()).put(u, 1.0 / val);
        }

        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String src = queries.get(i).get(0), dst = queries.get(i).get(1);
            if (!graph.containsKey(src) || !graph.containsKey(dst)) {
                res[i] = -1.0;
            } else if (src.equals(dst)) {
                res[i] = 1.0;
            } else {
                res[i] = dfs(graph, src, dst, 1.0, new HashSet<>());
            }
        }
        return res;
    }

    private double dfs(Map<String, Map<String, Double>> graph, String curr, String target, double product, Set<String> visited) {
        visited.add(curr);
        Map<String, Double> neighbors = graph.get(curr);
        if (neighbors.containsKey(target)) {
            return product * neighbors.get(target);
        }
        for (Map.Entry<String, Double> entry : neighbors.entrySet()) {
            String next = entry.getKey();
            if (!visited.contains(next)) {
                double ans = dfs(graph, next, target, product * entry.getValue(), visited);
                if (ans != -1.0) return ans;
            }
        }
        return -1.0;
    }
}`,
  complexity: { time: "O(Q * (V + E)) where Q is query count", space: "O(V + E)" },
  simpleExplanation: "1. Treat variables as cities and conversion rates as directed road lengths.\n2. a/b = 2 means a road from a to b with weight 2, and b to a with weight 0.5.\n3. To solve x/y, find a path from x to y and multiply the road weights together using DFS.",
  hints: ["Model as weighted directed graph", "Each equation gives two edges: a->b with val, b->a with 1/val", "DFS path multiplication finds the ratio"],
  interviewNotes: ["Weighted Union-Find with path compression is an O((V+E) + Q) alternative", "DFS is easier to write bug-free during an interview", "Remember reciprocal edges (1.0 / val)"],
  oneLineAnswer: "Build directed graph with edge weights val and 1/val; answer each query by finding a path via DFS and multiplying edge weights.",
  edgeCases: ["Query contains unknown variable -> -1.0", "a / a when a is known -> 1.0", "Disconnected components -> -1.0"],
  similar: [{id: 839, title: "Similar String Groups"}]
},

// ─── LINKED LIST ────────────────────────────────────────────────────────────
{
  id: 141, title: "Linked List Cycle", topic: "Linked List", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
  description: "Given head, the head of a linked list, determine if the linked list has a cycle in it using O(1) memory.\n\nExample:\nInput: head = [3,2,0,-4], pos = 1 (tail connects to node 1)\nOutput: true",
  intuition: "Floyd's Tortoise and Hare algorithm: slow moves 1 step, fast moves 2 steps. If there is a cycle, fast will eventually lap slow and they will collide.",
  approach: "1. If head == null or head.next == null, return false.\n2. slow = head, fast = head.\n3. While fast != null && fast.next != null:\n   - slow = slow.next.\n   - fast = fast.next.next.\n   - If slow == fast, cycle detected -> return true.\n4. If loop terminates, return false.",
  javaSolution: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;         // 1 step
            fast = fast.next.next;    // 2 steps
            if (slow == fast) return true; // collision indicates cycle
        }
        return false;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Send a slow runner (1 step at a time) and a fast runner (2 steps at a time).\n2. If the track is a straight line, fast will hit the end.\n3. If there is a loop, fast will catch up to slow from behind and collide.",
  hints: ["Two pointers: slow and fast", "Floyd's Cycle Detection Algorithm", "O(1) memory requirement rules out HashSet"],
  interviewNotes: ["Proof of termination: in a cycle of length C, fast gains 1 step on slow per iteration, so they collide in at most C steps", "Check fast != null && fast.next != null to avoid NullPointerException", "Standard classic interview question"],
  oneLineAnswer: "Floyd's Tortoise and Hare: move slow 1 step and fast 2 steps; a collision indicates a cycle in O(1) space.",
  edgeCases: ["Empty list: false", "Single node with no cycle: false", "Single node cycling to itself: true"],
  similar: [{id: 142, title: "Linked List Cycle II"}, {id: 202, title: "Happy Number"}]
},
{
  id: 2, title: "Add Two Numbers", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
  description: "You are given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list.\n\nExample:\nInput: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8] (342 + 465 = 807)",
  intuition: "Since digits are stored in reverse order, the heads represent the least significant digits. Simulate elementary school addition digit-by-digit with carry from left to right.",
  approach: "1. Dummy head node dummy, curr = dummy, carry = 0.\n2. While l1 != null || l2 != null || carry != 0:\n   - sum = carry + (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0).\n   - carry = sum / 10.\n   - curr.next = new ListNode(sum % 10).\n   - Advance curr, l1, l2.\n3. Return dummy.next.",
  javaSolution: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }

            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
        }
        return dummy.next;
    }
}`,
  complexity: { time: "O(max(m, n))", space: "O(max(m, n)) for result list" },
  simpleExplanation: "1. Add matching digits from both lists along with any carry from the previous step.\n2. Make a new node with sum % 10.\n3. Carry over sum / 10 to the next digit.\n4. Continue until both lists and the carry are exhausted.",
  hints: ["Keep adding while l1 != null || l2 != null || carry != 0", "Use dummy head to simplify list construction", "carry = sum / 10, digit = sum % 10"],
  interviewNotes: ["Notice the condition include carry != 0: handles remaining carry when both lists finish (e.g. 5 + 5 = 10)", "Dummy head pattern simplifies pointer manipulation", "No need to reverse inputs because numbers are already reversed"],
  oneLineAnswer: "Simulate column addition with a carry variable, building new nodes until both lists and carry are empty.",
  edgeCases: ["Lists of different lengths", "Final carry creates an extra node (e.g., 99 + 1 = 100)", "Zero-valued lists [0] + [0]"],
  similar: [{id: 445, title: "Add Two Numbers II"}, {id: 67, title: "Add Binary"}]
},
{
  id: 21, title: "Merge Two Sorted Lists", topic: "Linked List", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
  description: "Merge two sorted linked lists and return it as a sorted list by splicing together the nodes of the first two lists.\n\nExample:\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
  intuition: "Compare the heads of both lists and attach the smaller node to the merged list. Advance that pointer and repeat. Splice the remainder when one list runs out.",
  approach: "1. Create dummy head node dummy, curr = dummy.\n2. While list1 != null && list2 != null:\n   - If list1.val <= list2.val: curr.next = list1; list1 = list1.next.\n   - Else: curr.next = list2; list2 = list2.next.\n   - curr = curr.next.\n3. Attach leftover: curr.next = (list1 != null) ? list1 : list2.\n4. Return dummy.next.",
  javaSolution: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }
        // Splice remaining nodes in one step
        curr.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
  complexity: { time: "O(n + m)", space: "O(1) in-place splicing" },
  simpleExplanation: "1. Use a dummy node to hold the start of your new chain.\n2. Compare the front cards of both decks; attach the smaller card.\n3. When one deck runs out, attach the entire remaining deck to the end.",
  hints: ["Use dummy node to avoid null head checks", "Direct pointer splicing is O(1) space", "Attach remaining list directly with curr.next = ..."],
  interviewNotes: ["Splicing existing nodes gives O(1) auxiliary space without allocating new nodes", "Dummy node technique avoids conditional initialization of the head pointer", "Foundation for Merge Sort on Linked Lists"],
  oneLineAnswer: "Iteratively link the smaller current node to the merged list using a dummy head, then attach the remaining list.",
  edgeCases: ["One or both lists empty", "Lists of unequal lengths", "Duplicate values across lists"],
  similar: [{id: 23, title: "Merge k Sorted Lists"}, {id: 88, title: "Merge Sorted Array"}]
},
{
  id: 138, title: "Copy List with Random Pointer", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
  description: "Construct a deep copy of a linked list where each node contains an additional random pointer which could point to any node in the list, or null.\n\nExample:\nInput: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\nOutput: deep copy of list",
  intuition: "Interweave copied nodes directly beside original nodes (A -> A' -> B -> B'). This lets us set random pointers in O(1) space: A'.random = A.random.next. Then unweave the two lists.",
  approach: "1. Pass 1: Duplicate each node in-place: curr.next = new Node(curr.val, curr.next).\n2. Pass 2: Set random pointers: if curr.random != null, curr.next.random = curr.random.next.\n3. Pass 3: Separate original and cloned lists, restoring original list.",
  javaSolution: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // Step 1: Insert cloned nodes directly after original nodes
        Node curr = head;
        while (curr != null) {
            Node clone = new Node(curr.val);
            clone.next = curr.next;
            curr.next = clone;
            curr = clone.next;
        }

        // Step 2: Assign random pointers for cloned nodes
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }

        // Step 3: Unweave the lists to restore original and extract clone
        curr = head;
        Node cloneHead = head.next;
        while (curr != null) {
            Node clone = curr.next;
            curr.next = clone.next;
            if (clone.next != null) {
                clone.next = clone.next.next;
            }
            curr = curr.next;
        }
        return cloneHead;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) extra space" },
  simpleExplanation: "1. Create duplicates right next to original nodes: A -> A' -> B -> B'.\n2. Copy random pointers: A's clone points to A.random's clone (which is A.random.next).\n3. Split the intertwined lists back into two separate chains.",
  hints: ["Interweaving avoids the need for a HashMap", "Clone's random is original.random.next", "Restore original list during decoupling"],
  interviewNotes: ["O(1) auxiliary space interweaving trick is the interview preferred approach over O(n) HashMap", "Must restore original list before returning clone", "Great test of pointer manipulation precision"],
  oneLineAnswer: "Interweave duplicate nodes (A->A'->B->B'), set clone random pointers via A.random.next, then unweave the two lists.",
  edgeCases: ["Empty list: null", "Random pointers pointing to null or to self", "All random pointers pointing to head"],
  similar: [{id: 133, title: "Clone Graph"}]
},
{
  id: 92, title: "Reverse Linked List II", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list-ii/",
  description: "Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right in one pass.\n\nExample:\nInput: head = [1,2,3,4,5], left = 2, right = 4\nOutput: [1,4,3,2,5]",
  intuition: "Find the node right before position left (prev). Repeatedly take the next node in the sublist and move it right after prev. This inverts the sublist incrementally.",
  approach: "1. Create dummy node before head.\n2. Advance prev pointer left - 1 times.\n3. curr = prev.next (the start of the sublist to reverse).\n4. For (right - left) times:\n   - temp = curr.next.\n   - curr.next = temp.next.\n   - temp.next = prev.next.\n   - prev.next = temp.\n5. Return dummy.next.",
  javaSolution: `class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        // Step 1: Reach the node just before 'left'
        for (int i = 0; i < left - 1; i++) prev = prev.next;

        // Step 2: In-place reversal of the sublist
        ListNode curr = prev.next;
        for (int i = 0; i < right - left; i++) {
            ListNode temp = curr.next;
            curr.next = temp.next;
            temp.next = prev.next;
            prev.next = temp;
        }
        return dummy.next;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Walk up to the node right before the reversal begins.\n2. Keep curr fixed and pull each following node forward to the front of the reversed section.\n3. Do this right - left times.",
  hints: ["Dummy node handles left = 1 seamlessly", "Repeatedly insert curr.next after prev", "Strictly single pass O(n) time and O(1) space"],
  interviewNotes: ["Notice dummy node is vital when left = 1 (reversing from the head)", "The 4-pointer exchange loop cleanly reverses in-place without auxiliary memory", "Common follow-up to standard Reverse Linked List"],
  oneLineAnswer: "Locate node before 'left', then repeatedly pluck curr.next and place it after prev in a single pass.",
  edgeCases: ["left == right (no reversal)", "left == 1 (head changes)", "Reversing entire list"],
  similar: [{id: 206, title: "Reverse Linked List"}, {id: 25, title: "Reverse Nodes in k-Group"}]
},
{
  id: 25, title: "Reverse Nodes in k-Group", topic: "Linked List", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
  description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. Nodes remaining at the end (fewer than k) should keep their original order.\n\nExample:\nInput: head = [1,2,3,4,5], k = 2\nOutput: [2,1,4,3,5]",
  intuition: "Count if there are at least k nodes available. If yes, reverse those k nodes and connect to the recursive result of the remaining list. If fewer than k nodes, leave them unchanged.",
  approach: "1. Count k nodes from head. If fewer than k exist, return head.\n2. Reverse the first k nodes standardly.\n3. head is now the tail of the reversed group: head.next = reverseKGroup(curr, k).\n4. Return new head (prev pointer after reversal).",
  javaSolution: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        // Step 1: Check if there are at least k nodes remaining
        ListNode curr = head;
        int count = 0;
        while (curr != null && count < k) {
            curr = curr.next;
            count++;
        }
        if (count < k) return head; // fewer than k nodes: leave as is

        // Step 2: Reverse k nodes
        ListNode prev = null;
        curr = head;
        for (int i = 0; i < k; i++) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        // Step 3: Recurse for the rest of the list
        head.next = reverseKGroup(curr, k);
        return prev;
    }
}`,
  complexity: { time: "O(n)", space: "O(n / k) recursion stack (or O(1) iterative)" },
  simpleExplanation: "1. Count if there are at least k nodes ahead.\n2. If not, leave them alone.\n3. If yes, reverse those k nodes, then recursively do the same for the rest of the list and link them up.",
  hints: ["Check if k nodes exist before reversing", "Standard 3-pointer reversal for the k block", "head becomes the new tail of the block"],
  interviewNotes: ["Cleanest recursive formulation for interview code", "Can be done iteratively with a dummy head for strict O(1) stack space", "Do not modify node values — pointers must be rearranged"],
  oneLineAnswer: "Check if k nodes exist; if so, reverse those k nodes and recursively link tail to reverseKGroup of the rest.",
  edgeCases: ["k = 1: no change", "List length is an exact multiple of k", "List length < k"],
  similar: [{id: 92, title: "Reverse Linked List II"}, {id: 24, title: "Swap Nodes in Pairs"}]
},
{
  id: 19, title: "Remove Nth Node From End of List", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
  description: "Given the head of a linked list, remove the nth node from the end of the list and return its head in one pass.\n\nExample:\nInput: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]",
  intuition: "Maintain two pointers with a gap of n nodes between them. Move the fast pointer n steps ahead. Then advance both pointers until fast hits the end. Slow will be right before the target node.",
  approach: "1. Create dummy node pointing to head; fast = dummy, slow = dummy.\n2. Move fast ahead n + 1 steps.\n3. Move both fast and slow ahead together until fast == null.\n4. Delete target node: slow.next = slow.next.next.\n5. Return dummy.next.",
  javaSolution: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;

        // Gap fast and slow by n + 1 steps
        for (int i = 0; i <= n; i++) fast = fast.next;

        // Slide the window to the end of list
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        // Delete the nth node from the end
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Place two pointers at dummy.\n2. Send fast runner n + 1 steps ahead.\n3. Walk both runners together until fast falls off the end of the list.\n4. Slow is now sitting right before the node to remove: skip it!",
  hints: ["Dummy node handles deleting the head node", "Two pointers separated by n + 1 steps", "One pass O(n)"],
  interviewNotes: ["Using a dummy node simplifies edge cases like removing the first node (head)", "Two-pointer gap trick guarantees exactly one pass", "Space is strictly O(1)"],
  oneLineAnswer: "Advance fast pointer n+1 steps ahead of slow from a dummy node, then step both until fast reaches null and skip slow.next.",
  edgeCases: ["Removing the head node (n == length)", "Single node list: returns null", "Removing the tail node (n == 1)"],
  similar: [{id: 82, title: "Remove Duplicates from Sorted List II"}]
},
{
  id: 82, title: "Remove Duplicates from Sorted List II", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
  description: "Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.\n\nExample:\nInput: head = [1,2,3,3,4,4,5]\nOutput: [1,2,5]",
  intuition: "Use a dummy head. Whenever curr.next and curr.next.next have identical values, loop forward to find the end of this duplicate run and skip the entire sequence.",
  approach: "1. dummy.next = head, prev = dummy.\n2. While prev.next != null:\n   - curr = prev.next.\n   - If curr.next != null && curr.val == curr.next.val:\n     - While curr.next != null && curr.val == curr.next.val: curr = curr.next.\n     - prev.next = curr.next (skip all instances).\n   - Else: prev = prev.next.\n3. Return dummy.next.",
  javaSolution: `class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        while (prev.next != null && prev.next.next != null) {
            if (prev.next.val == prev.next.next.val) {
                int duplicateVal = prev.next.val;
                // Skip all nodes with this duplicate value
                while (prev.next != null && prev.next.val == duplicateVal) {
                    prev.next = prev.next.next;
                }
            } else {
                prev = prev.next;
            }
        }
        return dummy.next;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Use a dummy node.\n2. If the next two nodes share the same value, record that value and keep skipping nodes until the value changes.\n3. If they don't match, advance prev safely.",
  hints: ["Keep track of duplicateVal to bypass all occurrences", "Use dummy node since head itself could be duplicate", "Only advance prev when no duplicates were found"],
  interviewNotes: ["Different from Remove Duplicates I (which keeps one copy)", "Dummy node is necessary since duplicates may start at the head", "Notice prev only advances when current value was unique"],
  oneLineAnswer: "If adjacent values match, store value and skip all nodes with that value; otherwise advance prev.",
  edgeCases: ["All nodes are duplicates ([1,1,1] -> null)", "No duplicates", "Duplicates at the very end of list"],
  similar: [{id: 83, title: "Remove Duplicates from Sorted List"}]
},
{
  id: 61, title: "Rotate List", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/rotate-list/",
  description: "Given the head of a linked list, rotate the list to the right by k places.\n\nExample:\nInput: head = [1,2,3,4,5], k = 2\nOutput: [4,5,1,2,3]",
  intuition: "Connect the tail to the head to form a ring. Find the new tail at position (len - (k % len) - 1) from head, break the ring, and return new tail's next as new head.",
  approach: "1. If head == null or k == 0, return head.\n2. Find length len and tail node. Connect tail.next = head (make circular).\n3. Effective rotations: k %= len. If k == 0, break cycle and return head.\n4. Walk len - k steps to find new tail.\n5. newHead = newTail.next; newTail.next = null.\n6. Return newHead.",
  javaSolution: `class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;

        // Step 1: Compute length and find the tail
        int len = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            len++;
        }

        // Step 2: Make circular
        tail.next = head;

        // Step 3: Find new tail: len - (k % len) steps from start
        k = k % len;
        int stepsToNewTail = len - k;
        ListNode newTail = tail;
        while (stepsToNewTail-- > 0) {
            newTail = newTail.next;
        }

        // Step 4: Break ring
        ListNode newHead = newTail.next;
        newTail.next = null;
        return newHead;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Measure list length and connect tail to head to make a loop.\n2. k = k % len.\n3. Count (len - k) steps around the circle to find the new cut point.\n4. Cut the loop and return the new start.",
  hints: ["Make circular ring by tail.next = head", "Normalize k = k % len", "New tail is at len - k steps from head"],
  interviewNotes: ["Circular list trick simplifies rotation to a single cut operation", "Always normalize k %= len to avoid redundant cycles", "Handles k > len smoothly"],
  oneLineAnswer: "Connect tail to head to form a ring, advance len - (k % len) steps to find new tail, cut ring and return new head.",
  edgeCases: ["k == 0 or k is multiple of length", "Single node list", "Empty list"],
  similar: [{id: 189, title: "Rotate Array"}]
},
{
  id: 86, title: "Partition List", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/partition-list/",
  description: "Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x, preserving relative order.\n\nExample:\nInput: head = [1,4,3,2,5,2], x = 3\nOutput: [1,2,2,4,3,5]",
  intuition: "Maintain two separate linked lists: one for nodes < x and one for nodes >= x. Iterate through original list, distributing nodes. Finally, concatenate the two lists.",
  approach: "1. Create lessDummy and greaterDummy with currLess and currGreater pointers.\n2. Iterate through head:\n   - If val < x: currLess.next = curr; currLess = currLess.next.\n   - Else: currGreater.next = curr; currGreater = currGreater.next.\n3. currGreater.next = null (prevent cycles!).\n4. currLess.next = greaterDummy.next.\n5. Return lessDummy.next.",
  javaSolution: `class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode lessDummy = new ListNode(0);
        ListNode greaterDummy = new ListNode(0);
        ListNode less = lessDummy, greater = greaterDummy;

        while (head != null) {
            if (head.val < x) {
                less.next = head;
                less = less.next;
            } else {
                greater.next = head;
                greater = greater.next;
            }
            head = head.next;
        }

        greater.next = null; // essential to prevent cycles!
        less.next = greaterDummy.next;
        return lessDummy.next;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) in-place pointers" },
  simpleExplanation: "1. Create two separate chains: one for small numbers (< x) and one for big numbers (>= x).\n2. Walk the original list and attach each node to the appropriate chain.\n3. Make sure the big chain ends with null (to avoid infinite loops).\n4. Glue small chain to big chain.",
  hints: ["Two dummy lists: less and greater", "Crucial: set greater.next = null to prevent cycles", "Link less.next = greaterDummy.next"],
  interviewNotes: ["Setting greater.next = null is the most common bug interviewees miss (causes infinite loops)", "Preserves original relative order (stable partition)", "Pure pointer manipulation in O(1) space"],
  oneLineAnswer: "Distribute nodes into two separate lists (< x and >= x), terminate greater list with null, and concatenate them.",
  edgeCases: ["All nodes < x or all nodes >= x", "Empty list", "Single node"],
  similar: [{id: 328, title: "Odd Even Linked List"}]
},
{
  id: 146, title: "LRU Cache", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
  description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with get and put in O(1) time complexity.\n\nExample:\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); lRUCache.put(2, 2);\nlRUCache.get(1);    // returns 1\nlRUCache.put(3, 3); // evicts key 2",
  intuition: "Combine a HashMap (for O(1) key lookup) with a Doubly Linked List (for O(1) node removal and insertion at head). Dummy head and tail nodes avoid edge-case checks.",
  approach: "1. Node class with key, val, prev, next.\n2. Dummy head and tail linked together: head <-> tail.\n3. get(key): if present, removeNode(node), insertToHead(node), return node.val. Else return -1.\n4. put(key, val): if present, update and moveToHead. If new, create node and insertToHead. If capacity exceeded, removeNode(tail.prev) and map.remove(evicted.key).",
  javaSolution: `class LRUCache {
    private static class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0);
    private final Node tail = new Node(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertHead(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.val = value;
            remove(node);
            insertHead(node);
        } else {
            if (map.size() == capacity) {
                Node lru = tail.prev;
                remove(lru);
                map.remove(lru.key);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            insertHead(newNode);
        }
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
}`,
  complexity: { time: "O(1) for both get and put", space: "O(capacity)" },
  simpleExplanation: "1. Use a HashMap to find items in O(1).\n2. Use a Doubly Linked List to keep track of most recent (head) to least recent (tail).\n3. When an item is accessed or added, move it to the front.\n4. If full, discard the item right before tail.",
  hints: ["HashMap + Doubly Linked List", "Dummy head and tail make node splicing trivial", "Store key in Node so you can remove from map on eviction"],
  interviewNotes: ["Why store key in Node? When evicting tail.prev, we must delete it from the HashMap by its key", "Dummy head/tail eliminates null checks when inserting/deleting", "Most frequently asked system/data-structure interview question"],
  oneLineAnswer: "HashMap for O(1) key-to-node lookup paired with Doubly Linked List for O(1) removal and insertion at head.",
  edgeCases: ["Capacity = 1", "Updating existing key value", "Evicting least recently used element properly"],
  similar: [{id: 460, title: "LFU Cache"}, {id: 432, title: "All O`one Data Structure"}]
},
{
  id: 117, title: "Populating Next Right Pointers in Each Node II", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/",
  description: "Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL. Must use constant extra space (not full BFS queue).\n\nExample:\nInput: root of binary tree with next pointers\nOutput: tree with populated next pointers",
  intuition: "Use the already-established next pointers of current level as a linked list to traverse the current level and stitch together the next level using a dummy head.",
  approach: "1. curr = root.\n2. While curr != null (looping over levels):\n   - dummy = new Node(0), tail = dummy.\n   - While curr != null (looping across current level):\n     - If curr.left != null: tail.next = curr.left; tail = tail.next.\n     - If curr.right != null: tail.next = curr.right; tail = tail.next.\n     - curr = curr.next.\n   - curr = dummy.next (move to next level).\n3. Return root.",
  javaSolution: `class Solution {
    public Node connect(Node root) {
        Node curr = root;

        while (curr != null) {
            Node dummy = new Node(0); // dummy head for the next level's linked list
            Node tail = dummy;

            // Traverse the current level using .next pointers
            while (curr != null) {
                if (curr.left != null) {
                    tail.next = curr.left;
                    tail = tail.next;
                }
                if (curr.right != null) {
                    tail.next = curr.right;
                    tail = tail.next;
                }
                curr = curr.next; // move to next sibling on current level
            }
            curr = dummy.next; // advance to the start of the next level
        }
        return root;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) extra space" },
  simpleExplanation: "1. Walk across the current level using the next pointers you built earlier.\n2. As you walk, link all children below you together like a linked list using a dummy head.\n3. Jump to the next level's dummy head and repeat.",
  hints: ["Level order traversal without a queue", "Use dummy node to collect children of the next level", "O(1) space constraint"],
  interviewNotes: ["Standard BFS queue requires O(n) space; this linked-list level traversal achieves strict O(1) space", "Works for arbitrary binary trees (unlike problem 116 which requires perfect binary tree)", "Dummy node resets at each level"],
  oneLineAnswer: "Traverse current level using existing .next pointers while stitching children of the next level into a linked list via dummy head in O(1) space.",
  edgeCases: ["Empty tree: null", "Leaves only on one side", "Missing left or right children"],
  similar: [{id: 116, title: "Populating Next Right Pointers in Each Node"}]
},
{
  id: 114, title: "Flatten Binary Tree to Linked List", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
  description: "Flatten the tree into a 'linked list' in-place where right child points to next node in pre-order traversal and left child is always null.\n\nExample:\nInput: root = [1,2,5,3,4,null,6]\nOutput: [1,null,2,null,3,null,4,null,5,null,6]",
  intuition: "Morris traversal variant: for each node with a left child, find the rightmost node of that left subtree (predecessor). Connect predecessor's right to current node's right. Move left subtree to right and set left to null.",
  approach: "1. curr = root.\n2. While curr != null:\n   - If curr.left != null:\n     - Find rightmost node of curr.left: pred = curr.left; while (pred.right != null) pred = pred.right.\n     - pred.right = curr.right.\n     - curr.right = curr.left.\n     - curr.left = null.\n   - curr = curr.right.",
  javaSolution: `class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        while (curr != null) {
            if (curr.left != null) {
                // Find rightmost node of left subtree
                TreeNode pred = curr.left;
                while (pred.right != null) pred = pred.right;

                // Splice current right subtree onto predecessor's right
                pred.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}`,
  complexity: { time: "O(n)", space: "O(1) in-place without recursion" },
  simpleExplanation: "1. If a node has a left subtree, find the bottom-right tip of that left subtree.\n2. Attach the current right subtree there.\n3. Move the whole left subtree over to the right and set left to null.\n4. Walk down the right spine.",
  hints: ["Morris traversal style in-place rewiring", "Attach curr.right to rightmost leaf of curr.left", "Move left child to right child and clear left"],
  interviewNotes: ["O(1) space Morris-like rewiring is superior to recursion (which takes O(h) call stack)", "Order must match pre-order traversal", "Every edge is visited at most twice -> O(n)"],
  oneLineAnswer: "Find rightmost node of left subtree, attach curr.right to it, move left child to right, and set left to null.",
  edgeCases: ["Tree with only right children: stays unchanged", "Tree with only left children", "Single node or null root"],
  similar: [{id: 430, title: "Flatten a Multilevel Doubly Linked List"}]
},
{
  id: 148, title: "Sort List", topic: "Linked List", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/sort-list/",
  description: "Given the head of a linked list, return the list after sorting it in O(n log n) time and O(log n) stack space (Merge Sort).\n\nExample:\nInput: head = [4,2,1,3]\nOutput: [1,2,3,4]",
  intuition: "Merge Sort is ideal for linked lists. Use slow/fast pointers to bisect list into two halves, recursively sort both halves, and merge the sorted halves.",
  approach: "1. Base case: if head == null || head.next == null, return head.\n2. Find midpoint using slow/fast pointers with prev pointer to cut the list: prev.next = null.\n3. left = sortList(head), right = sortList(slow).\n4. Return merge(left, right).",
  javaSolution: `class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;

        // Step 1: Bisect list with slow/fast pointers
        ListNode prev = null, slow = head, fast = head;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = null; // cut the link between two halves

        // Step 2: Recursively sort halves
        ListNode left = sortList(head);
        ListNode right = sortList(slow);

        // Step 3: Merge sorted halves
        return merge(left, right);
    }

    private ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }
        curr.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`,
  complexity: { time: "O(n log n)", space: "O(log n) recursion stack" },
  simpleExplanation: "1. Split the linked list in half using slow and fast pointers.\n2. Cut the connection between the two halves.\n3. Recursively sort both halves.\n4. Merge the two sorted halves together.",
  hints: ["Merge Sort on linked list is O(n log n)", "Slow/fast pointers to find the middle", "Cut the list with prev.next = null"],
  interviewNotes: ["Linked lists are naturally suited to Merge Sort because merging requires O(1) extra space", "Bottom-up iterative merge sort can achieve strict O(1) space", "Remember to sever the link (prev.next = null) to prevent infinite loops"],
  oneLineAnswer: "Divide and conquer: split list into two halves using slow/fast pointers, recursively sort both, and merge.",
  edgeCases: ["Empty list or single node", "Already sorted list", "Reverse sorted list"],
  similar: [{id: 21, title: "Merge Two Sorted Lists"}, {id: 23, title: "Merge k Sorted Lists"}]
},
{
  id: 23, title: "Merge k Sorted Lists", topic: "Linked List", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
  description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.\n\nExample:\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
  intuition: "Maintain a min-heap (PriorityQueue) of size k holding the current head of each non-empty list. Repeatedly extract the minimum node, append it to merged list, and push its next node into the heap.",
  approach: "1. PriorityQueue<ListNode> pq with comparator (a, b) -> a.val - b.val.\n2. Insert non-null heads of all k lists into pq.\n3. While pq is not empty:\n   - minNode = pq.poll().\n   - curr.next = minNode; curr = curr.next.\n   - If minNode.next != null, pq.offer(minNode.next).\n4. Return dummy.next.",
  javaSolution: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));

        // Seed heap with head of each non-empty list
        for (ListNode node : lists) {
            if (node != null) pq.offer(node);
        }

        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;

        while (!pq.isEmpty()) {
            ListNode minNode = pq.poll();
            curr.next = minNode;
            curr = curr.next;
            if (minNode.next != null) pq.offer(minNode.next);
        }
        return dummy.next;
    }
}`,
  complexity: { time: "O(N log k) where N is total nodes, k is list count", space: "O(k) heap space" },
  simpleExplanation: "1. Put the first node of each list into a Priority Queue (min-heap).\n2. The smallest node in the heap is the next overall smallest: pop it and add to merged chain.\n3. If that node had a next item, push it into the heap.\n4. Repeat until heap is empty.",
  hints: ["Min-heap of size k", "Only store currently active head nodes in heap", "O(N log k) is optimal"],
  interviewNotes: ["Alternative approach: Divide and conquer pairwise merging (similar to merge sort) also achieves O(N log k) and O(1) space", "Use Integer.compare to prevent potential overflow", "Classic FAANG Hard interview problem"],
  oneLineAnswer: "Maintain a min-heap of size k storing active list heads; poll the smallest and push its next node in O(N log k).",
  edgeCases: ["lists is empty or null", "lists contains all nulls [[], []]", "k = 1 single list"],
  similar: [{id: 21, title: "Merge Two Sorted Lists"}, {id: 264, title: "Ugly Number II"}]
}
];

