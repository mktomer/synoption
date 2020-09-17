<?php

 session_start();

    class DatabaseSettings
    {
        private $settings;
    
        function getSettings()
        {
            if(strpos($_SERVER['SERVER_NAME'], 'local') !== false)
            {
                $settings['dbhost'] = 'localhost';
                // Database name
                $settings['dbname'] = 'synoption';
                // Username
                $settings['dbusername'] = 'root';
                // Password
                $settings['dbpassword'] = '';
            }
            else
            {
            $settings['dbhost'] = 'localhost';
            // Database name
            $settings['dbname'] = 'mktomer_tests';
            // Username
            $settings['dbusername'] = 'mktomer_tests';
            // Password
            $settings['dbpassword'] = 'Tests@123456';

            }
            
            return $settings;
        }
		
		
    }
 
 
 
    class DBClass extends DatabaseSettings
    {
        private $classQuery;
        var $link;
        
        var $errno = '';
        var $error = '';
        
       
        function DBClass()
        {
          
            $settings = DatabaseSettings::getSettings();
            
            
            $host = $settings['dbhost'];
            $name = $settings['dbname'];
            $user = $settings['dbusername'];
            $pass = $settings['dbpassword'];
            
           
            $this->link = new mysqli( $host , $user , $pass , $name );
        }
        
       
        function query( $query ) 
        {
            $this->classQuery = $query;
			return $this->link->query( $query );
        }
        
        function escapeString( $query )
        {
            return $this->link->escape_string( $query );
        }
        
       
        function numRows( $result )
        {
            return $result->num_rows;
        }
        
        function lastInsertedID()
        {
            return $this->link->insert_id;
        }
        
       
        function fetchAssoc( $result )
        {
            return $result->fetch_assoc();
        }
        
       
        function fetchArray( $result , $resultType = MYSQLI_ASSOC )
        {
            return $result->fetch_array( $resultType );
        }
        
       
        function fetchAll( $result , $resultType = MYSQLI_ASSOC )
        {
            return $result->fetch_all( $resultType );
        }
        
       
        function fetchRow( $result )
        {
            return $result->fetch_row();
        }
        
       
        function freeResult( $result )
        {
            $this->link->free_result( $result );
        }
        
        
        function close() 
        {
            $this->link->close();
        }
        
        function sql_error()
        {
            if( empty( $error ) )
            {
                $errno = $this->link->errno;
                $error = $this->link->error;
            }
            return $errno . ' : ' . $error;
        }
    }

 

?>